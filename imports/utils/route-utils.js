import { FlowRouter } from 'meteor/kadira:flow-router';

export function isRoute(route) {
  FlowRouter.watchPathChange();
  const info = FlowRouter.current();
  return info.route.name === route;
}

export function isRoutePassword() {
  return isRoute('thread') ||
    isRoute('thread.tag') ||
    isRoute('thread.said');
}

export function getPath(route, params, queryParams) {
  return FlowRouter.path(route, params, queryParams);
}

export function getParam(param) {
  return FlowRouter.getParam(param);
}
