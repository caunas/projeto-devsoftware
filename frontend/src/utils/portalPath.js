export function getPortalPath(profile, path = "") {
  return path ? `/${profile}/${path}` : `/${profile}`;
}
