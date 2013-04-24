var stereoViewer;
if (typeof stereoViewer !== 'object') {
    stereoViewer = {};
}

stereoViewer.template =
    '<div id="stereoCanvasdiv" style="" onmouseover="stereoDrawControls(event)" onmousemove="stereoDrawControls(event);" onmouseout="stereoDrawControls(event);" onmouse="stereoDrawControls(event);" onclick="stereoMouseClick(event);" ondblclick="if (stereoiOS) stereoViewerOptionsOpen(!stereoOptVis);" >' +
        '<canvas id="stereoCanvas"></canvas>' +
    '</div>' +
    '<div id="stereoControls" style="z-index:2; position:fixed; background-color:#fff; opacity:.9; padding:16px; margin:0px; border:1px; border-style:solid; border-color:black; visibility:hidden; left:16px; top:16px;' +
            '-moz-box-shadow: 1px 4px 10px rgba(68,68,68,0.6);' +
            '-webkit-box-shadow: 1px 4px 10px rgba(68,68,68,0.6);' +
            'box-shadow: 1px 4px 10px rgba(68,68,68,0.6);' +
            'filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30);' +
            '-ms-filter: "progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)";">' +
        '<!--input type="button" value="Save As (FF only)" onclick="stereoSaveAs();" /><br /-->' +
        '<center>' +
        '<input type="button" value="Close Viewer" onclick="stereoViewerClose();" />' +
        '<input type="button" value="Help" onclick="stereoHelpOpen();" />' +
        '<input type="button" value="?" onclick="stereoAboutOpen();" /></center>' +
        '<hr /><br />' +
        '<b>Mode:</b><br /><br />' +
        '<select onchange="stereoModeChange(0);" id="modeselect">' +
        '<option>Right Left (0)</option>' +
        '<option>Left Right (1)</option>' +
        '<option>Left (2)</option>' +
        '<option>Right (3)</option>' +
        '<option>Color Anaglyph (4)</option>' +
        '<option>Optimized Anaglyph 1 (5)</option>' +
        '<option>Optimized Anaglyph 2 (6)</option>' +
        '<option>Gray Anaglyph (7)</option>' +
        '<option>Half Color Anaglyph (8)</option>' +
        '<option>True Anaglyph (9)</option>' +
        '<option>Interlaced</option>' +
        '<option>Interlaced vertical</option>' +
        '</select><br />' +
        '<select onchange="stereoGlassesChange();" id="stereoGlasses" />' +
        '<option>Red-Cyan glasses</option>' +
        '<option>Green-Magenta glasses</option>' +
        '</select><br /><br />' +
        '<label><input type="checkbox" value="" onclick="stereoModeChange(stereoMode);" id="stereoSwap" /> Swap</label><br /><br />' +
        '<input type="button" id="stereoSaveDef" value="Save as Default" onclick="stereoSaveDef();" />' +
        '<br /><hr /><br />' +
        '<b>Background color:</b><br /><br />' +
        '<input type="button" value="White" onclick="stereoBG(2);" />' +
        '<input type="button" value="Gray" onclick="stereoBG(1);" />' +
        '<input type="button" value="Black" onclick="stereoBG(0);" /><br />' +
        '<br /><hr /><br />' +
        '<input type="checkbox" value="" onclick="stereoBG(stereoBGcolor);" id="stereoNav" style="visibility:hidden"/><!-- Navigation buttons<br /-->' +
        '<label><input type="checkbox" value="" onclick="stereoModeChange(stereoMode);" id="stereoCap" /> Show captions</label><br />' +
    '</div>' +
    '<div id="stereoHelp" style="z-index:3; position:fixed; background-color:#fff; opacity:.9; padding:16px; margin:0px; border:1px; border-style:solid; border-color:black; visibility:hidden; top:16px; right:16px;' +
            '-moz-box-shadow: 1px 4px 10px rgba(68,68,68,0.6);' +
            '-webkit-box-shadow: 1px 4px 10px rgba(68,68,68,0.6);' +
            'box-shadow: 1px 4px 10px rgba(68,68,68,0.6);' +
            'filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30);' +
            '-ms-filter: "progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)";">' +
        'Click <b>Right</b> / <b>Left</b> or <b>Center</b> parts of the image<br /> to view <b>Next</b> / <b>Previous</b> images or <b>Options</b>.<br /><br />' +
        '<center><b>Keyboard shortcuts:</b></center><br />' +
        '<center><table style="border:0"><tr><td><b>Esc&nbsp;&nbsp;</b></td><td> - &nbsp;&nbsp;close Stereo Viewer</tr>' +
        '<tr><td><b>Right Arrow&nbsp;&nbsp;</b></td><td> - &nbsp;&nbsp;next image</tr>' +
        '<tr><td><b>Left Arrow&nbsp;&nbsp;</b></td><td> - &nbsp;&nbsp;previous image</tr>' +
        '<tr><td><b>0..9&nbsp;&nbsp;</b></td><td> - &nbsp;&nbsp;change mode</tr>' +
        '<tr><td><b>s&nbsp;&nbsp;</b></td><td> - &nbsp;&nbsp;swap left/right</tr>' +
        '</table>' +
        '<br /><input type="button" value="OK" onclick="stereoViewerOptionsOpen(false);" /></center>' +
    '</div>' +
    '<div id="stereoAbout" style="z-index:3; position:fixed; background-color:#fff; opacity:.9; padding:16px; margin:0px; border:1px; border-style:solid; border-color:black; visibility:hidden; top:16px; right:16px;' +
            '-moz-box-shadow: 1px 4px 10px rgba(68,68,68,0.6);' +
            '-webkit-box-shadow: 1px 4px 10px rgba(68,68,68,0.6);' +
            'box-shadow: 1px 4px 10px rgba(68,68,68,0.6);' +
            'filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30);' +
            '-ms-filter: "progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)";">' +
        '<center><b><%= name %></b><br />' +
        'version <%= version %><br /><br />' +
        '(c) <%= grunt.template.today("yyyy") %> <%= author.name %><br /><br />' +
        '<a href="<%= homepage %>"><%= homepage %></a>' +
        '<br /><br /><hr /><br />' +
        // <%= licenses[0].type %> <%= licenses[0].url %>
        '<a rel="license" href="http://creativecommons.org/licenses/by/3.0/" title="This work is licensed under a Creative Commons Attribution 3.0 Unported License"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/88x31.png" /></a>' +
    '</div>';
