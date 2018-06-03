testeTintTo = {
    jsList: [
    ],
    JsonList: {

    },
    res: {
        img: "HelloWorld.png"
    },
    usandoColor: false,
    usandoCtor: false,
    colorToString: function(cor) {
        return "{r: " + cor.r  + ", g: " + cor.g + ", b: " + cor.b + ", a: " + cor.a + "}";
    },
    colorToSeparatedString: function(cor) {
        return cor.r  + ", " + cor.g + ", " + cor.b + ", " + cor.a;
    }
};

testeTintTo.MainScene = pd.MainScene.extend({
    ctor: function() {
        this.mainLayerClass = testeTintTo.MainLayer;
        this._super();
    }
});

testeTintTo.MainLayer = cc.Layer.extend({
    init: function() {
        this._super();
        this.background = new cc.LayerColor(cc.color("#808080"));
        this.addChild(this.background, 0);
        this.img = pd.createSprite(testeTintTo.res.img, {x: 512, y: 384}, this, 1);
        var fnc = function (thisArg, label, x, y, cor, objSprite) {
            var ret = new pd.StandardButton(pd.StandardButton.Shapes.ROUNDED, "_", {x: x, y: y}, true, false, null,
                cor, thisArg, function (caller, isPressed) {
                    if(!isPressed) {
                        objSprite.stopAllActions();
                        if(testeTintTo.usandoCtor) {
                            if(testeTintTo.usandoColor) {
                                cc.log("new cc.TintTo: " + testeTintTo.colorToString(cor));
                                objSprite.runAction(new cc.TintTo(1, cor));
                            } else {
                                cc.log("new cc.TintTo: " + testeTintTo.colorToSeparatedString(cor));
                                objSprite.runAction(new cc.TintTo(1, cor.r, cor.g, cor.b));
                            }
                        } else {
                            if(testeTintTo.usandoColor) {
                                cc.log("cc.tintTo: " + testeTintTo.colorToString(cor));
                                objSprite.runAction(cc.tintTo(1, cor));
                            } else {
                                cc.log("cc.tintTo: " + testeTintTo.colorToSeparatedString(cor));
                                objSprite.runAction(cc.tintTo(1, cor.r, cor.g, cor.b));
                            }
                        }
                    }
            });
            ret._label.setFontFillColor(cc.color.BLACK);
            ret._label.setString(label);
            thisArg.addChild(ret, 1);
            return ret;
        };
        pd.decorate(this, pd.decorators.DebugDrawNode);
        this.btnRed = fnc(this, "R", 250, 200, cc.color.RED, this.img);
        this.btnGreen = fnc(this, "G", 500, 650, cc.color.GREEN, this.img);
        this.btnBlue = fnc(this, "B", 750, 200, cc.color.BLUE, this.img);
        this.btnWhite = fnc(this, "W", 500, 100, cc.color.WHITE, this.img);
        
        var fncBotoesConfig = function (thisArg, attr, globalVariableName, textBase) {
            ret = new pd.StandardButton(pd.StandardButton.Shapes.ROUNDED, pd.StandardButton.Icons.NONE, 
            attr, true, false, null, null, this, function(caller, isPressed) {
                if(!isPressed) {
                    testeTintTo[caller.variableName] = !testeTintTo[caller.variableName];
                    caller.label.setString(caller.textoBase + testeTintTo[caller.variableName]);
                }
            });
            ret.textoBase = textBase + "\n";
            ret.variableName = globalVariableName;
            thisArg.addChild(ret, 1);
            ret.label = pd.createTextWithStandardFont(pd.Fonts.DIMBO, ret.width / 2 - 5, 125, 30, cc.color.WHITE, ret.textoBase + testeTintTo[globalVariableName], cc.TEXT_ALIGNMENT_CENTER, ret, 1);
            return ret;
        };
        this.btnUsarCtor = fncBotoesConfig(this, {x: 250, y: 550}, "usandoCtor", "Usando Ctor:");
        this.btnUsarColor = fncBotoesConfig(this, {x: 750, y: 550}, "usandoColor", "Passando cc.Color:");
    }
});

pd.delegate.transitionTime = 0.5;
if(pd.delegate.context !== pd.Delegate.CONTEXT_PALCO)
    pd.delegate.initWithNamespace(testeTintTo);
