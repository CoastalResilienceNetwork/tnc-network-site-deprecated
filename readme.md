Setup
---------------

This is a simple web application for displaying a catalog of Regional TNC sites, called the Network.  It assumes it will be deployed on IIS on Windows, but there is not server side code and could be run from any web server.  To build an installer, use the fabric command:

<code>fab build_installer</code>

To setup the fabric build environment, ensure these dependencies are met

  - pip
  - Pre-build [PyCrypto binaries] for Windows (pip can't install on windows)
  - fabric


[PyCrypto binaries]: http://www.voidspace.org.uk/python/modules.shtml#index

