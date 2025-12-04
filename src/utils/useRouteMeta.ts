import { matchPath, useLocation } from 'react-router-dom';
import { routes } from 'src/routes';
import { RouteLink } from 'src/types';

export function useRouteMeta() {
    const location = useLocation();
    const currentPathname = location.pathname;
    return findMatchingRoute(routes, currentPathname);
}

function findMatchingRoute(routeList: RouteLink[], pathname: string): RouteLink | undefined {
    for (const route of routeList) {
        if (route.path) {
            const match = matchPath({ path: route.path, end: true }, pathname);
            if (match) {
                return route;
            }
        }
        if (route.children) {
            const childMatch = findMatchingRoute(route.children, pathname);
            if (childMatch) {
                return childMatch;
            }
        }
    }
    return undefined;
}
