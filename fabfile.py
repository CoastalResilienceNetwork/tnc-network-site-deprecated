from fabric.api import *

def clone_nsis():
	local('git clone git://git.internal.azavea.com/git/Azavea_Common/NSIS build\NSIS')