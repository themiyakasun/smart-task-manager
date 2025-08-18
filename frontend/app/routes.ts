import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/root/root-layout.tsx', [index('routes/root/home.tsx')]),
  layout('routes/auth/auth-layout.tsx', [
    route('sign-in', 'routes/auth/sign-in.tsx'),
    route('sign-up', 'routes/auth/sign-up.tsx'),
  ]),
] satisfies RouteConfig;
