import { useLocation } from 'react-router-dom';
import { routes } from 'src/routes';

export function useRouteMeta() {
    const location = useLocation();
    const currentPathname = location.pathname;

    return routes
        .flatMap((route) => {
            if (route.children) {
                return route.children;
            }
            return route;
        })
        .find((route) => route.path === currentPathname);
}
