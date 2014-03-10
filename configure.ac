AC_PREREQ(2.69)

AC_INIT([i3ipc-gjs], [0.1.1], [tony@dubstepdish.com])

AC_PREFIX_DEFAULT([/usr])
AC_CONFIG_AUX_DIR([build])
AC_CONFIG_MACRO_DIR([build/autotools])

AM_INIT_AUTOMAKE([-Wall -Werror foreign -Wno-portability])

PKG_CHECK_MODULES([I3IPC], [i3ipc-glib-1.0 >= 0.1])
PKG_CHECK_MODULES([GJS], [gjs-1.0])

AC_ARG_WITH([gjs_overrides_dir],
            AC_HELP_STRING([--with-gjs-overrides-dir], [Path to gjs overrides directory]))

AC_MSG_CHECKING(for gjs overrides directory)
if test "x$with_gjs_overrides_dir" = "x" ; then
    overrides_dir="`$PKG_CONFIG --variable=datadir gjs-1.0`/gjs-1.0/overrides"
else
    overrides_dir="$with_gjs_overrides_dir"
fi

GJS_OVERRIDES_DIR="$overrides_dir"
AC_SUBST(GJS_OVERRIDES_DIR)
AC_MSG_RESULT($GJS_OVERRIDES_DIR)

AM_SILENT_RULES([yes])

AC_CONFIG_FILES([
                 Makefile
                 ])

AC_OUTPUT
