# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2026-02-01

### Changed
- Live preview in Playground now spans the full page width.
- Optimized `ReviewGrid` internal padding for edge-to-edge layouts.

## [0.3.0] - 2026-02-01

### Added
- Automatic scrolling (marquee effect) for the review wall.
- `autoScroll` and `autoScrollSpeed` UI settings.
- Automatic pause of scrolling on hover or during manual drag.
- Logic to only auto-scroll if content overflows the container.

## [0.2.2] - 2026-02-01

### Fixed
- Prevented text selection/highlighting while dragging the review wall.

## [0.2.1] - 2026-02-01

### Added
- "Grab-to-scroll" support for desktop users in `ReviewGrid`.
- Visual feedback (grabbing cursor) when interacting with the wall.

### Fixed
- Removed unnecessary horizontal padding from the outer container.
- Improved scroll behavior when dragging.

## [0.2.0] - 2026-02-01

### Added
- Horizontal "Running Wall" layout for reviews with snap points and swipe support.
- `no-scrollbar` utility for cleaner horizontal scrolling.

### Changed
- Default `ReviewGrid` layout changed from vertical grid to horizontal row.

## [0.1.1] - 2026-02-01

### Changed
- Removed hardcoded background from `ReviewGrid` to support transparency.
- Refined dark theme color palette in `ReviewCard` and Playground for better contrast.

## [0.1.0] - 2026-02-01

### Added
- Dark theme support for Review components.
- Toggle for Google logo visibility.
- Name anonymization options (full, initials, hidden).
- `prepare` script to enable installation as a git dependency.
- Privacy policy page.

### Changed
- Refined UI styles and responsive grid layout.
- Standardized package naming and build artifacts.

### Fixed
- Unused variable build error in `ReviewGrid`.
- Missing build files when installing via git.
