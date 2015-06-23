/**
 * Created by Ignatov on 19.06.2015.
 */
export default function performRouteHandlerStaticMethod(routes, methodName, ...args) {
    return Promise.all(routes
            .map(route => route.handler[methodName])
            .filter(method => typeof method === 'function')
            .map(method => method(...args))
    );
}