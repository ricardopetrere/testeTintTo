/**
 * @function - entry point.
 * @global
 */
cc.game.onStart = function() {
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(1024, 768, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    cc.loader.loadJson("paths.json", function(err, data) {
        if(err)
            cc.director.runScene(new HelloWorldScene());
        else {
            const paths = cc.sys.isMobile ? data.mobile : data.desktop;
            cc.loader.loadJs(paths.padroesPath, ["src/Boot.js"], function() {
                pd.boot(paths);
            });
        }
    });
};
cc.game.run();