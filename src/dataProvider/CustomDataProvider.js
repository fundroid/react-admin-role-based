import { stringify } from "query-string";
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY
} from "react-admin";

/**
 * Maps react-admin queries to a simple REST API
 * @see https://github.com/marmelab/FakeRest
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = "";
        let options = {}
        switch (type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const query = {
                    pagination: JSON.stringify({
                        skip: (page - 1) * perPage,
                        limit: perPage
                    }),
                    sort: JSON.stringify(params.sort),
                    filter: JSON.stringify(params.filter)
                };

                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY:
                const query = {
                    filter: JSON.stringify({ _id: params.ids }),
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                // const {field, order} = params.sort;
                const query = {
                    pagination: JSON.stringify({
                        skip: (page - 1) * perPage,
                        limit: perPage
                    }),
                    sort: JSON.stringify(params.sort),
                    filter: JSON.stringify(params.filter)
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = "PUT";
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = "POST";
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = "DELETE";
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }

        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const { headers, json } = response;
        console.log("-=--------------------= headers =--------------------")
        console.log(headers)
        console.log("-=--------------------= type =--------------------")
        console.log("type" + type)

        switch (type) {
            case GET_LIST:
            case GET_MANY:
            case GET_MANY_REFERENCE:
                return {
                    data: json.data,
                    total: json.total
                };
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            default:
                return { data: json };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: "PUT",
                        body: JSON.stringify(params.data)
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json)
            }));
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: "DELETE"
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json)
            }));
        }


        const { url, options } = convertDataRequestToHTTP(type, resource, params);
        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        );
    };
};