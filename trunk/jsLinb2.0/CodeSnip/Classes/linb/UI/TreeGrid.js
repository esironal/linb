Class('App.linb_UI_TreeGrid', 'linb.Com',{
    Instance:{
        tg2page:0,
        //Com events
        events:{"onReady":"_onready"},
        _loaded:{},
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new linb.UI.Tabs)
                .host(host,"tabs")
                .setItems([{"id":"a", "caption":"editable,rowDragable,colMovable"}, {"id":"b", "caption":"data binding"}, {"id":"c", "caption":"grid for select"}, {"id":"d", "caption":"others"}])
                .setLeft(0)
                .setTop(0)
                .setValue('a')
                .onItemSelected("_tabs2_onitemselected")
            );

            host.tabs.append((new linb.UI.Dialog)
                .host(host,"dialog10")
                .setLeft(20)
                .setTop(220)
                .setWidth(360)
                .setHeight(180)
                .setCaption("group, preview")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setCloseBtn(false)
                .setPinBtn(false)
            , 'd');

            host.dialog10.append((new linb.UI.TreeGrid)
                .host(host,"tg5")
                .setHeader([])
                .setRows([])
                .setColMovable(true)
                .setColHidable(true)
                .setDropKeys("abc")
                .setDragKey("abc")
                .afterUIValueSet("_tg5_afteruivalueset")
            );

            host.tabs.append((new linb.UI.Layout)
                .host(host,"layout4")
                .setItems([{"id":"before", "pos":"before", "locked":false, "size":260, "min":50, "max":500, "hide":false, "cmd":false}, {"id":"main", "min":10}])
                .setLeft(0)
                .setTop(0)
            , 'b');

            host.layout4.append((new linb.UI.TreeGrid)
                .host(host,"tg2")
                .setSelMode("none")
                .setHeader([])
                .setRows([])
                .afterRowActive("_tg2_afterRowActive")
                .setCustomStyle({'CELL':'border-right:none;padding-right:1px;'})
            , 'before');

            host.layout4.append((new linb.UI.Panel)
                .host(host,"panelFrom")
                .setCaption("panelFrom")
            , 'main');

            host.layout4.append((new linb.UI.Button)
                .host(host,"button19")
                .setLeft(520)
                .setTop(50)
                .setWidth(130)
                .setZIndex(10)
                .setCaption("Update")
                .onClick("_button19_onclick")
            , 'main');

            host.layout4.append((new linb.UI.Block)
                .host(host,"block2")
                .setDock("bottom")
                .setHeight(24)
                .setCustomStyle({"BORDER":"border:solid 1px #CDCDCD;", "PANEL":"background-color:#F4F4F4;"})
            , 'before');

            host.block2.append((new linb.UI.PageBar)
                .host(host,"pagebar3")
                .setLeft(20)
                .setTop(3)
                .setValue("1:1:5")
                .onClick("_pagebar3_onclick")
            );

            host.tabs.append((new linb.UI.ComboInput)
                .host(host,"comboinput4")
                .setLeft(80)
                .setTop(30)
                .setType("popbox")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .onClickButton("_comboinput4_onclickbutton")
            , 'c');

            host.tabs.append((new linb.UI.Dialog)
                .host(host,"dialog7")
                .setLeft(20)
                .setTop(20)
                .setWidth(360)
                .setHeight(180)
                .setCaption("customize cell type")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setCloseBtn(false)
                .setPinBtn(false)
            , 'd');

            host.dialog7.append((new linb.UI.TreeGrid)
                .host(host,"tg3")
                .setSelMode("none")
                .setHeader([])
                .setRows([])
            );

            host.tabs.append((new linb.UI.ComboInput)
                .host(host,"comboinput8")
                .setLeft(230)
                .setTop(30)
                .setType("popbox")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .onClickButton("_comboinput8_onclickbutton")
            , 'c');

            host.tabs.append((new linb.UI.ComboInput)
                .host(host,"comboinput9")
                .setLeft(80)
                .setTop(100)
                .setType("popbox")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .onClickButton("_comboinput9_onclickbutton")
            , 'c');

            host.tabs.append((new linb.UI.Dialog)
                .host(host,"dialog8")
                .setLeft(410)
                .setTop(20)
                .setWidth(360)
                .setHeight(180)
                .setCaption("grid in grid")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setCloseBtn(false)
                .setPinBtn(false)
            , 'd');

            host.dialog8.append((new linb.UI.TreeGrid)
                .host(host,"tg4")
                .setSelMode("multi")
                .setHeader([])
                .setRows([])
                .onGetContent("_tg4_ongetcontent")
                .afterUIValueSet("_tg4_afteruivalueset")
            );

            host.tabs.append((new linb.UI.TreeGrid)
                .host(host,"tg1")
                .setRowNumbered(true)
                .setEditable(true)
                .setAnimCollapse(true)
                .setHeader([])
                .setRows([])
                .setColMovable(true)
                .setColHidable(true)
                .setDropKeys("abc")
                .setDragKey("abc")
                .onClickButton("_tg1_onClickButton")
            , 'a');

            host.tabs.append((new linb.UI.Dialog)
                .host(host,"dialog9")
                .setLeft(410)
                .setTop(220)
                .setWidth(360)
                .setHeight(180)
                .setCaption("row number and alt row background color")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setCloseBtn(false)
                .setPinBtn(false)
            , 'd');

            host.dialog9.append((new linb.UI.TreeGrid)
                .host(host,"tg6")
                .setAltRowsBg(true)
                .setRowNumbered(true)
                .setHeader([])
                .setRows([])
            );

            host.tabs.append((new linb.UI.ComboInput)
                .host(host,"comboinput10")
                .setLeft(230)
                .setTop(100)
                .setType("popbox")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .onClickButton("_comboinput10_onclickbutton")
            , 'c');

            return children;
            // ]]code created by jsLinb UI Builder
        },
        _tabs2_onitemselected:function (profile, item, src) {
            var id=item.id;
            if(SPA._loaded[id])return;
            switch(id){
                case 'a':
                    linb.Ajax('App/js/grid1.js','',function(s){var hash=_.unserialize(s);SPA.tg1.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();
                break;
                case 'b':
                    linb.Ajax('App/js/grid2.js','',function(s){var hash=_.unserialize(s);  SPA.tg2data=hash.rows;  SPA.tg2.setHeader(hash.header).setRows(SPA.tg2data.slice(SPA.tg2page*5, (SPA.tg2page+1)*5));},null,null,{asy:false}).start();
                break;
                case 'd':
                    SPA.tg3.setHeader([{
                            "id" : "col2",
                            "caption" : "desc"
                        },
                        {
                            "id" : "col2",
                            "caption" : "checkbox",
                            "type" : "checkbox"
                        },
                        {
                            "id" : "col3",
                            "caption" : "input",
                            "type" : "input"
                        },
                        {
                            "id" : "col4",
                            "caption" : "colorpicker",
                            "type" : "colorpicker"
                        }]
                    ).setRows([{
                        id:'row1',
                        cells:['type in column',true,'abc','#FFFFFF']
                    },{
                        id:'row2',
                        type:'checkbox',
                        cells:[{type:'label',value:'type in row'},true,false,true]
                    },{
                        id:'row3',
                        cells:['type in cell',{value:true,type:'checkbox'},{value:'#F00FFF',type:'colorpicker'},{value:'def',type:'input'}]
                    }]);
                    SPA.tg4.setHeader(['col1','col2','col3','col4'])
                    .setRows([{cells:['11','12','13','14'],sub:new linb.UI.Button({position:'relative'})},{id:'row2',cells:['21','22','23','24'],sub:true},['31','32','33','34'],['41','42','43','44']]);

                    SPA.tg5.setHeader(['col1','col2','col3','col4'])
                .setRows([{cells:['11','12','13','14'],preview:'<h5>preview 1</h5><p>the preview message1 will displayed here</p>'},{cells:['21','22','23','24'],preview:'<h5>preview 2</h5><p>the preview message2 will displayed here</p>'},{id:'grp1',group:true,
                    caption:'group layer 1',
                    render : function(profile,row){return "<span style='width:16px;height:16px;background:url(img/img.gif) left -32px'></span>"+row.caption},
                    sub:[['11-11','12-11','13-11','14-11'],{id:'grp2',group:true,caption:'group layer2',sub:[['21-11','22-11','23-11','24-11'],['21-21','22-21','23-21','24-21']]},['11-21','12-21','13-21','14-21']]},{cells:['31','32','33','34'],sub:[['a','b','c','d'],['aa','bb','cc','dd']]},['41','42','43','44']]);
                    SPA.tg6.setHeader(['col1','col2','col3','col4'])
                    .setRows([{cells:['11','12','13','14'],sub:[
                        ['11-1','12-1','13-1','14-1'],{cells:['11-2','12-2','13-2','14-2'], sub:[
                            ['11-11','12-11','13-11','14-11'],['11-21','12-21','13-21','14-21']
                        ]}]
                     },{cells:['21','22','23','24'],sub:[
                        ['21-1','22-1','23-1','24-1'],{cells:['21-2','22-2','23-2','24-2'], sub:[
                            ['21-11','22-11','23-11','24-11'],['21-21','22-21','23-21','24-21']
                        ]}]
                     },['31','32','33','34'],['41','42','43','44']]);
                break;
            }

            SPA._loaded[id]=true;
        },
        _tg1_onClickButton:function(profile, cell, proEditor){
            switch(profile.box.getCellPro(profile, cell, 'type')){
                case 'getter':
                    proEditor.boxing().setUIValue(_());
                break;
                case 'cmdbox':
                case 'popbox':
                case 'button':
                    linb.message(cell._row.id+'/'+cell._header.id+' clicked!');
                break;
            }
        },
        _tg2_afterRowActive:function(profile, row){
            if(!SPA.$dbBinder){
                SPA.$dbBinder = new linb.DataBinder();
                SPA.$dbBinder.setName('tr2');

                var cells=profile.properties.header,t,
                    ns=[],
                    name,widget,type,t;

                _.arr.each(cells,function(o){
                    type=o.type;
                    ns.push(t=[o.caption]);

                    if(type=='checkbox')
                        widget=widget=new linb.UI.CheckBox();
                    else if(!type || type=='label')
                        widget=new linb.UI.Label({caption:o.caption});
                    else if(!type || type=='button')
                        widget=new linb.UI.Button();
                    else
                        widget=new linb.UI.ComboInput();

                    if(widget.setDataBinder)
                        widget.setDataBinder('tr2').setDataField(o.id);

                    t[1]=widget.get(0);

                    switch(type){
                        case 'number':
                            widget.setType('none').setCustomStyle('INPUT',"text-align:right;");
                            break;
                        case 'progress':
                            widget.setType('none').setValueFormat("^(0([\\.]\\d*[0-9]+)|0|1)$").setCustomStyle('INPUT',"text-align:right;");
                            break;
                        case 'input':
                            widget.setType('none');
                            break;
                        case 'textarea':
                            widget.setType('none').setMultiLines(true).setWidth(200).setHeight(100);
                            break;
                        case 'listbox':
                        case 'combobox':
                        case 'helpinput':
                            widget.setType(type);
                            if(t=o.editorListKey)
                                widget.setListKey(t);
                            else if(t=o.editorListItems)
                                widget.setItems(t);
                            break;
                        case 'timepicker':
                        case 'datepicker':
                        case 'colorpicker':
                            widget.setType(type);
                            break;
                        case 'getter':
                        case 'popbox':
                        case 'cmdbox':
                            widget.setType(type);
                            break;
                    }


                    var editorFormat = o.editorFormat,
                        editorReadonly = o.editorReadonly;

                    if(widget.setReadonly)widget.setReadonly(!!editorReadonly);
                    if(editorFormat){
                        if(typeof editorFormat == 'function'){
                            if(widget.beforeFormatCheck)widget.beforeFormatCheck(editorFormat);
                        }else{
                            if(widget.setValueFormat)widget.setValueFormat(editorFormat);
                        }
                    }
                });

                var str='', nodes=[];

                _.arr.each(ns,function(arr){
                    nodes.push(arr[1]);
                })
                nodes=linb.UI.pack(nodes,false);
                nodes.setPosition('relative');

                for(var i=0;i<ns.length;i+=2){
                    str += '<tr><td align="right" style="text-decoration:underline;">'+ ns[i][0] +"</td><td>"+ ns[i][1].toHtml() +'</td>';
                    if(ns[i+1])
                        str +='<td align="right"  style="text-decoration:underline;">'+ ns[i+1][0] +"</td><td>"+ ns[i+1][1].toHtml() +'</td>';
                    str +='</tr>';
                }

                SPA.panelFrom.setHtml('<table cellspacing="4" style="border-spacing:10px;border-collapse:separate;">'+str+'</table>',false);
                nodes.render(true);
            }
            var hash={};
            SPA.$curRow=row;
            _.arr.each(row.cells,function(o){
                hash[o._col.id]=o.value;
            });
            SPA.$dbBinder.resetValue(hash).getUI().setDisabled(false)
        },
//This function can build form dynamically
/*        _tg2_afterRowActive:function(profile, row){
            SPA.panelFrom.setHtml('');

            var cells=row.cells,t,
                ns=[],
                getPro=linb.UI.TreeGrid.getCellPro,
                name,widget,type,t;

            _.arr.each(cells,function(o){
                type=getPro(profile, o, 'type');
                ns.push(t=[o._col.caption]);

                if(type=='checkbox')
                    widget=widget=new linb.UI.CheckBox();
                else if(!type || type=='label')
                    widget=new linb.UI.Label({caption:o.caption});
                else if(!type || type=='button')
                    widget=new linb.UI.Button();
                else
                    widget=new linb.UI.ComboInput();

                if(widget.setDataBinder)
                    widget.setDataBinder('tr2').setDataField(o._col.id);

                t[1]=widget.get(0);

                switch(type){
                    case 'number':
                        widget.setType('none').setCustomStyle('INPUT',"text-align:right;");
                        break;
                    case 'progress':
                        widget.setType('none').setValueFormat("^(0([\\.]\\d*[0-9]+)|0|1)$").setCustomStyle('INPUT',"text-align:right;");
                        break;
                    case 'input':
                        widget.setType('none');
                        break;
                    case 'textarea':
                        widget.setType('none').setMultiLines(true).setWidth(200).setHeight(100);
                        break;
                    case 'listbox':
                    case 'combobox':
                    case 'helpinput':
                        widget.setType(type);
                        if(t=getPro(profile,o,'editorListKey'))
                            widget.setListKey(t);
                        else if(t=getPro(profile,o,'editorListItems'))
                            widget.setItems(t);
                        break;
                    case 'timepicker':
                    case 'datepicker':
                    case 'colorpicker':
                        widget.setType(type);
                        break;
                    case 'getter':
                    case 'popbox':
                    case 'cmdbox':
                        widget.setType(type).onClickButton(function(pro, pos, e, src){
                            if(getPro(profile, o, 'disabled'))return false;
                            var event=getPro(profile, o, 'event');
                            if(typeof event == 'function' && false===event.call(profile._host||profile, profile, o, pro, pos,e,src)){}
                            else
                                profile.boxing().onClickButton(profile, pro.$cell, pro, pos, e, src);
                        });
                        break;
                }

                if(widget.setValue)
                    widget.setValue(o.$value).setUIValue(o.value);

                var editorFormat = getPro(profile, o,'editorFormat'),
                    editorReadonly = getPro(profile, o,'editorReadonly');

                if(widget.setReadonly)widget.setReadonly(!!editorReadonly);
                if(editorFormat){
                    if(typeof editorFormat == 'function'){
                        if(widget.beforeFormatCheck)widget.beforeFormatCheck(editorFormat);
                    }else{
                        if(widget.setValueFormat)widget.setValueFormat(editorFormat);
                    }
                }
            });


            var str='', nodes=[];

            _.arr.each(ns,function(arr){
                nodes.push(arr[1]);
            })
            nodes=linb.UI.pack(nodes,false);
            nodes.setPosition('relative');

            for(var i=0;i<ns.length;i+=2){
                str += '<tr><td align="right" style="text-decoration:underline;">'+ ns[i][0] +"</td><td>"+ ns[i][1].toHtml() +'</td>';
                if(ns[i+1])
                    str +='<td align="right"  style="text-decoration:underline;">'+ ns[i+1][0] +"</td><td>"+ ns[i+1][1].toHtml() +'</td>';
                str +='</tr>';
            }

            SPA.panelFrom.setHtml('<table cellspacing="4" style="border-spacing:10px;border-collapse:separate;">'+str+'</table>',false);

            nodes.render(true);
        },
*/
        _onready:function () {
            SPA=this;
            linb.UI.cacheData('demo',[{id:'a',caption:'cap a',icon:'img/img.gif'},{id:'b',caption:'cap b',icon:'img/img.gif',iconPos:'left -16px'},{id:'c',caption:'cap c',icon:'img/img.gif',iconPos:'left -32px'}]);
            linb.CSS.setStyleRules('.linb-demo1',{'background-color':'#AEDEAE'});
        },
        _pagebar3_onclick:function (profile, src) {

            var self = profile.boxing(),
                value = self.getValue(),
                a = value.split(':');
            a[1] = src.href.split('#')[1];
            self.setValue(a.join(':'));

            SPA.tg2page=(parseInt(a[1])-1)||0;

            SPA.tg2.setRows(SPA.tg2data.slice(SPA.tg2page*5, (SPA.tg2page+1)*5));

            if(SPA.$dbBinder){
                SPA.$dbBinder.resetValue().getUI().setDisabled(true)
            }
            SPA.$curRow=null;

            return false;
        },
        _tg4_afteruivalueset:function (profile, oldValue, newValue) {
            linb.message(newValue);
        },
        _tg5_afteruivalueset:function (profile, oldValue, newValue) {
            linb.message(newValue);
        },
        _poptg:function(profile, pos, mode1, mode2, callback){
            var g;
            if(!SPA.popTg){
                g=SPA.popTg=new linb.UI.TreeGrid({width:300,height:160,dock:'none',visibility:'hidden',rowHandler:false});
                g.setCustomStyle('KEY','border:solid 1px #888');
                g.setHeader(['a','b','c','d'])
                 .setRows([['1','2','3','4'],['5','6','7','8'],['9','10','11','12'],['13','14','15','16']])
                 .setShowHeader(false);
                linb('body').append(g);
            }
            g=SPA.popTg;
            g.setValue('',true)
             .setActiveMode(mode1)
             .setSelMode(mode2)
             .afterUIValueSet(callback)
             .getRoot().popToTop(pos).setBlurTrigger('__a', function(){
                g.hide();
            });
            linb.Event.keyboardHook('esc',0,0,0,function(){
                g.hide();
                linb.Event.keyboardHook('esc');
            });
        },
        _comboinput4_onclickbutton:function (profile, pos, e, src) {
            this._poptg(profile,pos,'cell','single',function(p, oldValue, newValue) {
                var a=(newValue||'').split('|');
                newValue=p.boxing().getCellbyRowCol(a[0],a[1]);
                profile.boxing().setUIValue(newValue.value);
                SPA.popTg.hide();
             });
        },
        _comboinput8_onclickbutton:function (profile, pos, e, src) {
            this._poptg(profile,pos,'cell','multi',function(p, oldValue, newValue) {
                newValue=newValue||'';
                var a=[];
                _.arr.each(newValue.split(';'),function(o){
                    var b=(o||'').split('|');
                    o=p.boxing().getCellbyRowCol(b[0],b[1]);
                    a.push(o.value);
                });
                profile.boxing().setUIValue(a.join(';'));
             });
        },
        _comboinput9_onclickbutton:function (profile, pos, e, src) {//
            this._poptg(profile,pos,'row','single',function(p, oldValue, newValue) {
                profile.boxing().setUIValue(newValue);
                SPA.popTg.hide();
             });
        },
        _comboinput10_onclickbutton:function (profile, pos, e, src) {
             this._poptg(profile,pos,'row','multi',function(p, oldValue, newValue) {
                profile.boxing().setUIValue(newValue);
             });
        },
        _button19_onclick:function (profile, e, src, value) {
            if(SPA.$dbBinder && SPA.$curRow){
                if(SPA.$dbBinder.checkValid()){
                    var hash=SPA.$dbBinder.getValue();
                    _.arr.each(SPA.$curRow.cells,function(cell){
                        SPA.tg2.updateCellByRowCol(cell._row.id,cell._col.id, {value:hash[cell._col.id]});
                    });
                    SPA.tg2.resetRowValue(SPA.$curRow.id);
                    linb.message('data updated!');
                }
                else
                    linb.message('please correct input first!');
            }
        },
        _tg4_ongetcontent:function (profile, item, callback, threadid) {
            return new linb.UI.TreeGrid({position:'relative',width:300,height:200, dock:'none',
                header:['c1','c2','c3','c4'],
                rows:[{cells:['11','12','13','14'],sub:[
                    ['11-1','12-1','13-1','14-1'],{cells:['11-2','12-2','13-2','14-2'], sub:[
                        ['11-11','12-11','13-11','14-11'],['11-21','12-21','13-21','14-21']
                    ]}]
                 },{cells:['21','22','23','24'],sub:[
                    ['21-1','22-1','23-1','24-1'],{cells:['21-2','22-2','23-2','24-2'], sub:[
                        ['21-11','22-11','23-11','24-11'],['21-21','22-21','23-21','24-21']
                    ]}]
                 },['31','32','33','34'],['41','42','43','44']]})
        }
    }
});



var UIHelper=[
    {tips:"UIHelper 1",delay:3000,time:1000,pos:{left:100,top:100}},
    {tips:"UIHelper 2",delay:3000,time:1000,pos:{left:200,top:100}},
    {tips:"UIHelper 3",delay:3000,time:1000,pos:{left:200,top:100}}
];

_.arr.each(UIHelper,function(o){
    o.task=function(){linb.Tips.show(this.pos, this); _.resetRun('$$$',function(){linb.Tips.hide()},this.time)};
    o.scope=o;
});

linb.Thread(null,UIHelper).start();