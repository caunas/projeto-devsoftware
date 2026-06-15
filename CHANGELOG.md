# Changelog

## 2026-06-15

### Added

- Added bearer-token authentication to the Spring Security filter chain.
- Added frontend event creation mapping for the local `POST /api/eventos` contract.
- Added centralized API error messages for authentication, network, and backend failures.

### Changed

- Fixed login to await the API request and consume the actual `{ acessToken }` response.
- Unified JWT persistence under `portal-auth-token` so the Axios interceptor sends the stored token.
- Updated the login form to identify users by email and validate the selected profile against the JWT role.
- Connected the coordinator event calendar to local event listing and creation endpoints.
- Initialized the event calendar from the current date instead of a hard-coded June 2026 date.
- Corrected the public Spring Security matcher from `/eventos/**` to `/api/eventos/**`.
- Made the JWT signing key configurable through `JWT_SECRET`, with a local development fallback.
- Removed an unused, broken duplicate event module and an unused legacy login import so frontend lint passes.
- Stabilized UI notification callbacks to prevent API effects from rerunning after notification state changes.

### Known limitations

- Activity publishing remains backed by frontend sample data. The current API requires explicit professor and class IDs and returns JPA entity graphs that need a stable DTO contract before safe frontend integration.
