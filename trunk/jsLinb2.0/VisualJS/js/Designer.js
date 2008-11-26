Class('VisualJS.Designer', 'linb.Com',{
    Instance:{
        panelHeight:600,
        panelWidth:800,
        dropPosition:'absolute',
        dropOffset:10,
        _setItems:function(target){
            var profile=target.get(0),
                pro=profile.properties,
                items=profile.box.$DataStruct.items,
                key=profile.KEY;
            
            if(key=='linb.UI.TreeGrid'){
                pro.header=['col1','col2', 'col3', 'col4'];
                pro.rows=[['row1 col1','row1 col2','row1 col3','row1 col4'],['row2 col1','row2 col2','row2 col3','row2 col4'],{cells:['row3 col1','row3 col2','row3 col3','row3 col4'],sub:[['sub1','sub2','sub3','sub4']]}];
            }else if(key=='linb.UI.ToolBar'||key=='linb.UI.MenuBar'||key=='linb.UI.TreeBar'){
                pro.items=[{id:'item b',sub:['sub b1', 'sub b1', 'sub b3', 'sub b4']}, {id:'item b',sub:['sub c1', 'sub c1', 'sub c3', 'sub c4']}];
            }else if(key=='linb.UI.Layout'){
                pro.items=[{id:'before',pos:'before'},{id:'main'},{id:'after',pos:'after'}];
            }else if(key=='linb.UI.ComboInput'){
                if(pro.type=='combobox'||pro.type=='listbox'||pro.type=='helpinput')
                    pro.items=['item a', 'item b', 'item c', 'item d'];
            }else{
                if(!items)return;
                pro.items=['item a', 'item b', 'item c', 'item d'];
            }
        },
        events:{
            onRender:function(page, threadid){
                
                var _refresh=page._refresh=function(obj, key){
                    obj.each(function(profile){
                        var t = (profile.domNode)?profile.root[key]():profile.properties[key];
                        obj['set'+_.str.initial(key)](t);
                    });
                    return obj['get'+_.str.initial(key)]();
                };

                //proxy region
                page.proxy = linb.create('<div style="position:absolute;border:dashed 1px blue;overflow:visible;left:-100px;top:-100px;z-index:1000"></div>');

                //resizer
                page.resizer = linb.create('AdvResizer',{
                    dragArgs:{
                        widthIncrement:this.dropOffset,
                        heightIncrement:this.dropOffset
                    },
                    zIndex:linb.Dom.TOP_ZINDEX
                });
                page.resizer.host(page)
                .onItemsSelected(function(profile, ids){
                    this.pProfile.setSelectFromResizer.call(this.pProfile,ids);
                })
                .onActive(function(profile){
                    this._focus();
                })
                .onUpdate(function(profile, target, size, cssPos){
                    page._change();

                    var self=this;
                    if(target){
                        var b=false;
                        target.each(function(target){
                            target = linb([target],false);
                            var profile = linb.UIProfile.getFromDomId(target.get(0).id), widget=profile.boxing(),p = profile.properties, m = profile.box.$DataModel;
                            if(size){
                                var w=null,h=null;
                                if(size.width){
                                    if(p && !m.width){
                                        b=true;
                                    }else{
                                        switch(p.dock){
                                            case 'top':
                                            case 'bottom':
                                            case 'fill':
                                            case 'cover':
                                            case 'width':
                                                b=true;
                                                break;
                                            case 'left':
                                            case 'right':
                                            case 'height':
                                                b=true;
                                            default:
                                                target.widthBy(size.width,true);
                                                w = _refresh(widget,'width');
                                            }
                                    }
                                }
                                if(size.height){
                                    if(p && !m.height){
                                        b=true;
                                    }else{
                                        switch(p.dock){
                                            case 'left':
                                            case 'right':
                                            case 'fill':
                                            case 'cover':
                                            case 'height':
                                                b=true;
                                                break;
                                            case 'top':
                                            case 'bottom':
                                            case 'width':
                                                b=true;
                                            default:
                                                target.heightBy(size.height,true);
                                                h = _refresh(widget,'height');
                                        }
                                    }
                                }

                                self._sizeUpdated(target, { width :w, height :h});
                            }
                            if(cssPos){
                                var x=null,y=null;
                                if(cssPos.left){
                                    if(p && !m.left){
                                        b=true;
                                    }else{
                                        switch(p.dock){
                                        case 'top':
                                        case 'bottom':
                                        case 'left':
                                        case 'right':
                                        case 'fill':
                                        case 'cover':
                                        case 'width':
                                            b=true;
                                            break;
                                        case 'height':
                                            b=true;
                                        default:
                                            target.leftBy(cssPos.left);
                                            x = _refresh(widget,'left');
                                        }
                                    }
                                }
                                if(cssPos.top){
                                    if(p && !m.top){
                                        b=true;
                                    }else{
                                        switch(p.dock){
                                        case 'left':
                                        case 'right':
                                        case 'top':
                                        case 'bottom':
                                        case 'fill':
                                        case 'cover':
                                        case 'height':
                                            b=true;
                                            break;
                                        case 'width':
                                            b=true;
                                         default:
                                            target.topBy(cssPos.top);
                                            y = _refresh(widget,'top');
                                        }
                                    }
                                }

                                self._posUpdated(target, {left :x, top :y});
                            }
                        });
                        if(b)profile.boxing().rePosSize();
                    }
                })
                .onFocusChange(function(profile, index){
                    if(this.tempSelected){
                        this.SelectedFocus=index;
                        _.resetRun('$profilegrid$', this._refreshProfileGrid,0,[this.tempSelected],this);
                    }
                })
                //select children even if parent is selected
                .onRegionClick(function(profile, e){
                    var ep=linb.Event.getPos(e),arr,t,m,ret;
                    var fun=function(arr, ep, parent){
                        var me=arguments.callee,
                            m,rt,pos,w,h,
                            //mouse abs pos offset
                            epoff={},
                            //parent abs pos
                            ppos=parent.offset(),
                            //parent size
                            rgw=parent.offsetWidth(),
                            rgh=parent.offsetHeight()
                            ;
                        epoff.left=ep.left-ppos.left;
                        epoff.top=ep.top-ppos.top;

                        _.arr.each(arr,function(o){
                            if(m=o[0].root){
                                if(o[0].children.length)
                                    if(rt=me(o[0].children, ep, m))
                                        return false;
                                pos=m.offset(null,parent);
                                w=m.offsetWidth();
                                h=m.offsetHeight();
                                if(epoff.left>pos.left && epoff.top>pos.top && epoff.left<pos.left+w && epoff.top<pos.top+h &&
                                   epoff.left<rgw&& epoff.top<rgh){
                                    rt=o[0].$id;
                                    return false;
                                }
                            }
                        });
                        return rt;
                    };
                    if(!(arr=this.tempSelected) || !arr.length)return;
                    _.arr.each(arr,function(o){
                        t=linb.getObject(o);
                        ret=fun(t.children, ep, t.root);
                        if(ret)return false;
                    });
                    if(ret){
                        this.selectWidget([ret]);
                        return false;
                    }
                });

                //div for hold resizer and proxy
                page.holder = linb.create('<div style="display:none;"></div>');
                //not append
                page.panelDiv.reBoxing().append(page.holder);
                page.holder.append(page.resizer);
                page.holder.append(page.proxy);

                page.proxy.get(0).zIndexIgnore=true;

                page.treebarCom
                .setItems(_.clone(CONF.widgets))
                .setCustomBehavior({
                    BAR:{
                        onMousedown : function(profile, e, src){
                            var id=src.id,
                                itemId = profile.getSubId(id),
                                properties = profile.properties,
                                item = profile.getItemByDom(id),
                                pos=linb.Event.getPos(e);

                            if(item.dragable){
                                profile.getSubNode('ICON', itemId).startDrag(e,{
                                    dragType:'icon', 
                                    proxyNode:linb(src).clone(true).id('', true).css({border:'solid 1px #ccc',padding:'3px',opacity:0.6}),
                                    dragCursor:'pointer', 
                                    targetLeft:pos.left+12,
                                    targetTop:pos.top+12, 
                                    dragKey:item.dragKey || profile.properties.dragKey, 
                                    dragData:{
                                        type:item.id, 
                                        iconPos:item.iconPos
                                    }
                                });
                                linb([src]).tagClass('-mouseover',false);

                                page._clearSelect();
                                page._setSelected([], true);
                            }
                        }
                    }
                });

                //focus
                page.focusBtn = linb.create('<a href="javascript;" style="position:absolute;left:-10000px;top:-10000px;width:1px;height:1px;">o</a>');
                page.focusBtn.onKeydown(function(pro, e, src){
                    if(!page.resizer)return;

                    var key = linb.Event.getKey(e),
                    k=key[0],
                    ctrl=key[1],
                    shift=key[2],
                    step=1,
                    o=page.resizer.reBoxing(),
                    profile = page.resizer.get(0),
                    cssPos=o.cssPos(),
                    cssSize=o.cssSize(),
                    gridh = profile.properties.dragArgs.heightIncrement,
                    gridw = profile.properties.dragArgs.widthIncrement
                    ;

                    var t,b=false,size=null,pos=null;

                    switch(k){
                        case 'up':
                            b=true;
                            if(ctrl)
                                step=-1;
                            else{
                                if(shift)
                                    step = (t=(cssPos.top+cssSize.height) % gridh)?-t:-gridh;
                                else
                                    step =(t = cssPos.top % gridh)?-t:-gridh;
                            }
                            if(shift){
                                o.heightBy(step);
                                profile.regions.heightBy(step);
                                size={ width :0, height :step};
                            }else{
                                o.topBy(step);
                                pos={left :0, top :step};
                            }
                            break;
                        case 'down':
                            b=true;
                            if(ctrl)
                                step=1;
                            else{
                                if(shift)
                                    step = (t=(cssPos.top+cssSize.height) % gridh)?gridh-t:gridh;
                                else
                                    step =(t = cssPos.top % gridh)?gridh-t:gridh;
                            }
                            if(shift){
                                o.heightBy(step);
                                profile.regions.heightBy(step);
                                size={ width :0, height :step};
                            }else{
                                o.topBy(step);
                                pos={left :0, top :step};
                            }
                            break;
                        case 'left':
                            b=true;
                            if(ctrl)
                                step=-1;
                            else{
                                if(shift)
                                    step = (t=(cssPos.left+cssSize.width) % gridw)?-t:-gridw;
                                else
                                    step =(t = cssPos.left % gridw)?-t:-gridw;
                            }
                            if(shift){
                                profile.regions.widthBy(step);
                                o.widthBy(step);
                                size={ width :step, height :null};
                            }else{
                                o.leftBy(step);
                                pos={left :step, top :0};
                            }
                            break;
                        case 'right':
                            b=true;
                            if(ctrl)
                                step=1;
                            else{
                                if(shift)
                                    step = (t=(cssPos.left+cssSize.width) % gridw)?gridw-t:gridw;
                                else
                                    step =(t = cssPos.left % gridw)?gridw-t:gridw;
                            }
                            if(shift){
                                o.widthBy(step);
                                profile.regions.widthBy(step);
                                size={ width :step, height :null};
                            }else{
                                o.leftBy(step);
                                pos={left :step, top :0};
                            }
                            break;
                        case 'delete':
                            page._deleteSelected();
                            page._focus();
                            break;
                        case 'esc':
                            page._clearSelect();
                            //reset
                            page._setSelected([], true);
                            break;
                    }
                    if(b){
                        profile.boxing().onUpdate(profile, profile._target, size, pos);
                        return false;
                    }
                }).
                onFocus(function(pro, e, src){
                    clearTimeout(page.timer);
                    page.resizer.active(false);
                }).
                onBlur(function(pro ,e , src){
                    page.timer = _.asyRun(function(){
                        if(page.resizer)page.resizer.inActive();
                    },200);
                });
                page.layoutBase.reBoxing().prepend(page.focusBtn);


                page._enablePanelDesign(page.canvas.get(0));

                //set to default status
                page.setText(page.properties.text||"",true,threadid);
            },
            onSelected:function(page, profile, ids){
                var v=null, id = ids && ids[ids.length-1];
                if(id){
                    var o = linb.getObject(id);
                    if(o)
                        v = o;
                }
                page.listObject.setUIValue(v?v.alias:'page', true);

                _.resetRun('$profilegrid$', page._refreshProfileGrid,0,[ids],page);
            },
            onReady:function(page){
                //set canvas width, height
                page.canvas.setWidth(page.panelWidth).setHeight(page.panelHeight);
                page.panelBG.setWidth(page.panelWidth).setHeight(page.panelHeight);
                

                var tbpath = linb.ini.appPath+'img/designer/toolbar.gif',
                    tbk='$VisualJS.designer.tool.';
                page.toolbar.setItems([{
                    id:'code',
                    sub:[
                    {
                        id : "format",
                        icon : CONF.img_app,
                        iconPos:"-32px -48px",
                        type : "button",
                        tips : tbk+'tocode'
                    },{
                        id : "json",
                        icon : CONF.img_app,
                        iconPos:"-128px -64px",
                        type : "button",
                        tips : tbk+'tojson'
                    }]},
                    {id:'align',
                    sub:[
                        {id:'left',caption:'',icon:tbpath,iconPos:'0 top', tips:tbk+'left'},
                        {id:'center',caption:'',icon:tbpath,iconPos:'-16px top',tips:tbk+'center'},
                        {id:'right',caption:'',icon:tbpath,iconPos:'-32px top',tips:tbk+'right'},
                        {id:'s1',type:'split'},
                        {id:'top',caption:'',icon:tbpath,iconPos:'-48px top',tips:tbk+'top'},
                        {id:'middle',caption:'',icon:tbpath,iconPos:'-64px top',tips:tbk+'middle'},
                        {id:'bottom',caption:'',icon:tbpath,iconPos:'-80px top',tips:tbk+'bottom'},
                        {id:'s2',type:'split'},
                        {id:'w',caption:'',icon:tbpath,iconPos:'-96px top',tips:tbk+'width'},
                        {id:'wh',caption:'',icon:tbpath,iconPos:'-112px top',tips:tbk+'wh'},
                        {id:'h',caption:'',icon:tbpath,iconPos:'-128px top',tips:tbk+'height'}
                    ]},
                    {id:'pos',
                    sub:[
                        {id:'zindex1',caption:'',icon:tbpath,iconPos:'-144px top',tips:tbk+'toplayer'},
                        {id:'zindex2',caption:'',icon:tbpath,iconPos:'-160px top',tips:tbk+'bottomlayer'},
                        {id:'s1',type:'split'},
                        {id:'repos',caption:'',icon:tbpath,iconPos:'-176px top',tips:tbk+'gridxy'},
                        {id:'resize',caption:'',icon:tbpath,iconPos:'-192px top',tips:tbk+'gridwh'},
                        {id:'s2',type:'split'},
                        {id:'clone',caption:'',icon:tbpath,iconPos:'-240px top',tips:tbk+'clone'}
                    ]},
                    {id:'del',
                    sub:[
                        {id:'delete',caption:'',icon:tbpath,iconPos:'-256px top', tips:tbk+'delete'}
                    ]}
                    ]
                );
            }
        },
        //dettach resizer and proxy from panel
        _detatchResizer:function(){
            var self=this;
            self.holder.append(self.resizer);
            self.holder.append(self.proxy);
            //clear those cache
            self.pProfile = self.pNode = null;
        },
        //append resizer and proxy to panel
        _attachResizer:function(profile, node){
            var self=this;
            self.proxy.css('display','none');
            self.resizer.resetTarget(null,false);
            linb(node)
            .append(self.resizer)
            .append(self.proxy)
            ;
            //set markable var
            self.pProfile = profile;
            self.pNode = node;
            _.merge(self.resizer.get(0).properties.dragArgs,{
                widthIncrement:self.dropOffset,
                heightIncrement:self.dropOffset
            },'all');
        },
        //give focus
        _focus:function(){
            //avoid focus trigger scroll
//            this.focusBtn.top(this.panelDiv.reBoxing().scrollTop())
//            .left(this.panelDiv.reBoxing().scrollLeft());
            this.focusBtn.focus();
        },
        _setSelected:function(ids, flag){
            var self=this,
                tb=self.toolbar,
                t;
            ids=_.isArr(ids)?ids:[];
            self.tempSelected = ids;
            self.SelectedFocus = ids.length-1;

            tb.showGroup('align', ids.length>1?true:false);
            if(ids.length>0 && (t=linb.getObject(ids[0])))
                tb.showGroup('pos', (t.box['linb.UI'] && !t.box.$noDomRoot));
            else
                tb.showGroup('pos', false);

            tb.showGroup('del', ids.length>0?true:false);

            // fire event
            if(flag) self.events.onSelected.apply(self.parent, [self, self.pProfile, ids]);

            self._focus();

            return self;
        },
        _sizeUpdated:function(pro, size){
            var t,self=this;
            if(!(t=self.profileGrid.get(0).$widget))return;
            if(linb.UIProfile.getFromDomId(pro.get(0).id) == t.get(t._nodes.length-1))
                _.asyRun(function(){
                    if(size.width!==null)
                    self.profileGrid.updateCellByRowCol('properties:width','value',{value:size.width})
                    if(size.height!==null)
                    self.profileGrid.updateCellByRowCol('properties:height','value',{value:size.height})
                    ;
                })
        },
        _posUpdated:function(pro, cssPos){
            var t,self=this;
            if(!(t=self.profileGrid.get(0).$widget))return;
            if(linb.UIProfile.getFromDomId(pro.get(0).id) == t.get(t._nodes.length-1))
                _.asyRun(function(){
                    if(cssPos.left!==null)
                    self.profileGrid.updateCellByRowCol('properties:left','value',{value:cssPos.left})
                    if(cssPos.top!==null)
                    self.profileGrid.updateCellByRowCol('properties:top','value',{value:cssPos.top})
                    ;
                })
        },
        parseFun:function(txt){
            var str = txt;
            var reg = new RegExp("^(\\s*\\/\\*[^*@]*\\*+([^\\/][^*]*\\*+)*\\/\\s*)|^(\\s*\\/\\/[^\\n]*\\s*)");
            while(reg.test(str)){
                str = str.replace(reg,'');
            }
            str = str.replace(/\s*/,'');
            if(!str)return {comments:null, code:null};

            if (false === this.check(str.replace(/\s*$/,'')) ) return false;

            return {comments: '\n'+txt.replace(str,''), code:str.replace(/\s*$/,'')};
        },
        _designable : function(profile){
            var me=arguments.callee,
                self=this;
            //change
            self._giveHandler(profile);
            //give design mark
            profile.properties.$design=self.properties.$design;
            var t=profile.behavior.DropableKeys;
            if(t && t.length)
                self._enablePanelDesign(profile);
             if(profile.children && profile.children.length){
                _.arr.each(profile.children,function(o){
                    me.call(self, o[0]);
                });
             }
             //for UI refresh itself
             profile.$addOns=function(profile){
                me.call(self,profile);
            };
        },

        _WidgetsSelected : function(ids){
            var self=this;
            this._setSelected(ids,true);
            this.iconlist.setUIValue(null);
        },
        _clearSelect : function(profile){
            this.resizer.resetTarget(null,false);
            this._detatchResizer();
            this.iconlist.setUIValue(null);
        },
        getByCacheId:function(idArr){
            var arr=[],t,n=linb.UI._cache;
            idArr = idArr instanceof Array?idArr:[idArr];
            _.arr.each(idArr,function(id){
                if(t=n['$'+id])arr[arr.length]=t;
            });
            return linb.UI.pack(arr,false);
        },
        _deleteSelected : function(){
            if(!this.tempSelected || !this.tempSelected.length)return;
            var page = this;
            linb.UI.Dialog.confirm(linb.getRes('VisualJS.designer.confirmdel'),linb.getRes('VisualJS.designer.confirmdel2', this.tempSelected.length),function(){
                var sel = page.getByCacheId(page.tempSelected);
                if(!sel.isEmpty()){
                    var ids=[];
                    //destroy, and will dettach from parent
                    var ws = page.getByCacheId(page.tempSelected);
                    ws.each(function(o){
                        if(!(o.box['linb.UI'] && !o.box.$noDomRoot))
                            page.iconlist.removeItems(o.$id);
                    });

                    ws.destroy();
                }else{
                    var o = linb.getObject(page.tempSelected[0]);
                    page.iconlist.removeItems(page.tempSelected);
                    o.boxing().destroy();
                }
                //clear resizer
                page._clearSelect(page.pProfile);

                //fire event
                //page.onDeleted(page.pProfile, page.tempSelected);

                page._setSelected(null,true);
            });

        },
        _giveHandler:function(target){
            var prevent = function(){
                return;
            };
            var page=this;
            target.root.beforeClick(prevent).afterClick(prevent).onClick(function(pro, e, src){
                var esrc=linb.Event.getSrc(e),
                    id=esrc.id,profile;

                //if lang span, get parent id
                if(id==linb.langId)id=esrc.parentNode.id;

                if(linb.UIProfile.getFromDomId(id) !== (profile=linb.UIProfile.getFromDomId(src.id)))return;

                var t,key=linb.Event.$keyboard;

                if(!profile)return;
                //if change panel, clear the panel selected
                if(page.pProfile && (page.pProfile !=profile.parent))
                    page.pProfile.selected = [];

                if(t=profile.parent){
                    if(key && key[2])
                        t.reSelectObject.call(t,profile, profile.root.parent());
                    else
                        t.selectObject.call(t,profile, profile.root.parent());
                }
                return false;
            });
        },
        _enablePanelDesignFace:function(profile, key){
            //add a class panel
            profile.getSubNode(key,true).addClass('panel')
            .$addEventHandler('drop')
            .$addEventHandler('mousedown')
            .$addEventHandler('click')
            .$addEventHandler('drag')
            .$addEventHandler('dragstop')
            .$addEventHandler('mouseup');
        },
        _enablePanelDesign:function(profile){
            var t,key = profile.box.KEY,pool=profile.behavior.DropableKeys, page=this,h, k,
            self=this,
            cb={
                //overwrite
                beforeMouseover:function(profile, e, src){
                    var dd = linb.DragDrop, pp=dd.getProfile(), key = pp.dragKey, data = pp.dragData;

                    //not include the dragkey
                    if(!key
                    || !data
                    || !(new RegExp('\\b'+key+'\\b')).test(profile.box.getDropKeys(profile, this)+":___iDesign")

                    || data.parentId == profile.$id
                    || (data.data && _.arr.indexOf(data.data,profile.$id)!=-1)

                    || (profile.onDropTest && (false===profile.boxing().onDropTest(profile, key, data)))
                    )return;

                    //for trigger onDrop
                    dd.setDropElement(src);
                    //show region
                    _.resetRun('setDropFace', dd.setDropFace, 0, [this], dd);

                    var id = (id=profile.getItemByDom(src)) && id.id;
                    if(profile.onDragEnter)profile.boxing().onDragEnter(profile, e, this, id);
                },
                beforeDrop:function(profile, e, src){
                    self._change();

                    var target,
                        dd=linb.DragDrop.getProfile(),
                        dropx=dd.x,
                        dropy=dd.y,
                        dragKey = dd.dragKey,
                        dragData = dd.dragData,
                        type=dragData.type,
                        iconPos = dragData.iconPos,
                        data=dragData.data,
                        pos=dragData.pos,

                        ids,
                        offset = self.dropOffset,

                        fun=function(){
                            var page=arguments.callee.page,t=linb.SC(type);
                            if(!(t['linb.UI'] && !t.$noDomRoot)){
                                //give design mark
                                var o = linb.create(type, {$design:self.properties.$design}).get(0);
                                page.iconlist.insertItems([{id:o.$id, image:'img/widgets.gif', iconPos:iconPos}],null,false);
                                page.iconlist.setUIValue(o.$id);
                                //
                            }else{
                                //before drop check
                                //if(false===_.tryF(c.beforeAddWidget, [data], profile))return;

                                //check position
                                if(self.dropPosition=='absolute'){
                                    // get Pos
                                    var basePos = linb(src).offset(),
                                    cssPos = {
                                        left : parseInt((dropx - basePos.left)/offset)*offset,
                                        top : parseInt((dropy - basePos.top)/offset)*offset
                                    };
                                    //give design mark
                                    target = new (linb.SC(linb.absBox.$type[type]))({$design:self.properties.$design});
                                    page._setItems(target);
                                    target.render();

                                    var p=target.get(0).properties;

                                    if(!p.$left)target.setLeft(_.arr.indexOf(['top','bottom','width','fill','cover'],p.dock)!=-1?0:cssPos.left);
                                    if(!p.$top)target.setTop(_.arr.indexOf(['left','right','height','fill','cover'],p.dock)!=-1?0:cssPos.top);
                                    if(!p.$position)target.setPosition('absolute');
                                    target.setZIndex(1);
                                }else{
                                    //give design mark
                                    target = new (linb.SC(linb.absBox.$type[type]))({$design:self.properties.$design});
                                    page._setItems(target);
                                    target.render();
                                }
                                var pro = target.get(0);

                                page._designable(pro);

                                pro._host=page;
                                // add default event handlers

                                var t=pro.box.$EventHandlers;
                                for(var i in t)
                                    pro[i]=t[i];

                                ids=[target['linb.absBox'] ? pro.$id : target.$id];

                                // add widgets to panel
                                //if(target['linb.UI'])linb.UI.canvas.prototype.append.call(profile.boxing(), target);
                                if(target['linb.UI'])profile.boxing().append(target, profile.getItemIdByDom(src));
                                //_.tryF(page.afterAddWidget, [target, profile.$id], page);

                                profile.setSelectFromPanel.call(profile, src, ids);
                                //refer dom node dir
                                src=null;
                            }
                        };
                        fun.page=page;
                    if(type){
                        if(linb.SC.get(type)){
                            fun();
                        }else{
                            _.observableRun(function(){
                                linb.Dom.setCover(linb.getRes('VisualJS.designer.loading') + type);
                                linb.SC(type, true, fun);
                            });
                        }
                    }else{
                        var basePos = linb(src).offset(),
                        cssPos = {
                            left : parseInt((dropx - basePos.left)/offset)*offset,
                            top : parseInt((dropy - basePos.top)/offset)*offset
                        };
                        var t;
                        ids=data;
                        target = self.getByCacheId(ids);

                        var minx,miny;
                        target.each(function(o,i){
                            if(i===0){
                                minx = o.properties.left;
                                miny = o.properties.top;
                            }else{
                                minx = Math.min(o.properties.left,minx);
                                miny = Math.min(o.properties.top,miny);
                            }
                        });
                        target.each(function(o){
                            if(o.properties.dock!='none')linb.UI.$dock(o,true);
                            else{
                                o.boxing()
                                .setLeft(o.properties.left - minx + cssPos.left)
                                .setTop(o.properties.top - miny + cssPos.top);
                            }
                        });

                        // add widgets to panel
                        profile.boxing().append(target, profile.getItemIdByDom(src));
                        //_.tryF(page.afterMoveWidget, [target, profile.$id], page);

                         profile.setSelectFromPanel.call(profile, src, ids);
                    }
                },
                onMousedown:function(profile, e, src){
                    if(linb.Event.getSrc(e) !== src)return;
                    var o =linb(src),
                    pos = linb.Event.getPos(e),
                    absPos=o.offset(),
                    w = o.innerWidth(),
                    h = o.innerHeight();
                    //in the scroll bar
                    if(pos.left-absPos.left>w)return;
                    if(pos.top-absPos.top>h)return;

                    // keep pos
                    profile._offsetPos = absPos;
                    profile._scrollTop = o.scrollTop();
                    profile._scrollLeft = o.scrollLeft();

                    page._attachResizer(profile, src);
                    profile._selregion = {};

                    var pos = linb.Event.getPos(e);
                    linb(src).startDrag(e,{
                        targetReposition:false,
                        dragType:'blank',
                        dragCursor:'crosshair',
                        targetLeft:pos.left,
                        targetTop:pos.top,
                        dragDefer:1
                    });
                    profile.$dragging=false;
                },
                onClick:function(profile, e, src){
                    if(linb.Event.getSrc(e) !== src)return;
                    self._clearSelect(profile);
                    profile.setSelectFromPanel.call(profile, this, []);
                },
                beforeDrag:function(profile, e, src){
                    var t, dd =linb.DragDrop.getProfile(), pos = dd.offset,
                    proxy=page.proxy;

                    var region = profile._selregion;
                    if((t=pos.x)<0)pos.x=-t;
                    if((t=pos.y)<0)pos.y=-t;

                    region.left=Math.min(dd.ox,dd.x) - profile._offsetPos.left + profile._scrollLeft;
                    region.top=Math.min(dd.oy,dd.y) - profile._offsetPos.top + profile._scrollTop;
                    region.width=pos.x;
                    region.height=pos.y;

                    proxy.cssRegion(region);

                    if(!profile.$dragging){
                        proxy.css('display','block');
                        profile.$dragging = true;
                    }
                },
                beforeDragstop:function(profile, e, src){
                    //if(!profile._selregion)return;
                    var region = profile._selregion,
                    proxy=page.proxy,

                    selected=[],t,m,o,x1,y1,x2,y2,xx1,yy1,xx2,yy2,
                    self=this
                    ;

                    xx1 = region.left;
                    yy1 = region.top;
                    xx2 = xx1 + region.width;
                    yy2 = yy1 + region.height;
                    if(m=profile.children){
                        _.arr.each(m,function(v,i){
                            v=v[0];
                            if(v.domNode.parentNode===self && v.domNode.style.display!='none' && v.domNode.style.visibility!='hidden'){
                                o=v.root;
                                x1= o.offsetLeft();
                                y1= o.offsetTop();
                                x2 = x1 + o.width();
                                y2 = y1 + o.height();
                                //in the region
                                if(xx2>x1 && x2>xx1 && yy2>y1 && y2>yy1)selected.push(v.$id);
                            }
                        });
                        //reset/cache proxy
                        profile.setSelectFromPanel.call(profile, this, selected);
                    }
                    //for firefox cursor bug
                    _.asyRun(function(){
                        proxy.css('display','none');
                    });
                },
                onMouseup:function(profile, e, src){
                    _.asyRun(function(){
                        page.proxy.css('display','none');
                    });
                }
            };

            if(t=pool){
                var i=_.arr.indexOf(t,'PANEL');
                if(i==-1)
                    i=_.arr.indexOf(t,'KEY');

                if(i!=-1){
                    i=t[i];
                    if(profile.keys.KEY == profile.keys[i])
                        h=cb;
                    else{
                        h={};
                        h[i]=cb;
                    }
                    //profile.boxing().setCustomBehavior(h);
                    profile._CB=h;
                    profile.clearCache();

                    page._enablePanelDesignFace(profile, i)
                }
            }

            _.merge(profile,{
                selectObject:function(obj,node){
                    var profile = this,
                    id=obj.$id;
                    return this.setSelectFromPanel(node, [id]);
                },
                reSelectObject:function(obj, node){
                    var profile = this;
                    id=obj.$id;
                    if(profile.selected && _.arr.indexOf(profile.selected,id)!=-1){
                        _.arr.removeValue(profile.selected,id);
                    }else{
                        (profile.selected ||(profile.selected=[])).push(id);
                    }
                    return this.setSelectFromPanel(node, profile.selected);
                },
                setSelectFromResizer:function(ids){
                    var profile = this;
                    profile.selected = ids;
                    return this.resetSelectRel();
                },
                setSelectFromPanel:function(node, ids){
                    var profile = this;
                    //append resizer
                    if(self.pProfile !== profile ||
                        self.pNode !== node){
                        self._clearSelect(profile);
                        self._attachResizer(profile, node);
                    }

                    profile.selected = ids;
                    self.resizer.resetTarget(self.getByCacheId(profile.selected).reBoxing(), false);
                    return this.resetSelectRel();
                },
                resetSelectRel:function(){
                    var profile = this;
                    if(profile.selected && profile.selected.length){
                        var t=self.resizer.get(0).properties;
                        t.dragArgs={
                            dragKey:'___iDesign',
                            widthIncrement:self.dropOffset,
                            heightIncrement:self.dropOffset,
                            dragData:{
                                parentId:profile.$id,
                                data:profile.selected
                            }
                        };
                    }else{
                        self._clearSelect(profile);
                    }
                    _.tryF(self._WidgetsSelected,[profile.selected],self);

                    self._focus();
                }
            },'all');


        },
        _refreshProfileGrid:function(ids){
            var page=this;
            //delete grid first
            this.profileGrid.removeAllRows();
            if(!ids || !ids.length){
                var pro = this.canvas.get(0);
                var arr=[];
                var eh = _.get(this.properties.clsObject,['Static','EventHandlers']);
                if(!eh)eh=linb.Com.EventHandlers;
                var em=_.get(this.properties.clsObject,['Instance','events']);
                var getCode=function(o){
                    var code;

                    var em = _.get(o.clsStruct,['sub','Instance', 'sub','events', 'code']);
                    if(em)em=_.unserialize(em);else em={};

                    var funName = em[o.funName] || ('_'+o.funName.toLowerCase());
                    var item = _.get(o.clsStruct, ['sub','Instance', 'sub', funName]);
                    var comments = (item? (item.comments || '') :'');
                    if(comments)comments = comments.replace(/^[\r\n]*/, '');

                    //if em exists
                    if(item&&item.code){
                        code = item&&item.code;
                        o.mapName=em[o.funName];
                    //if em doesn't exist
                    }else{
                        if(!o.ini)return '';

                        code = _.str.repeat(' ',8) + o.ini.toString().replace(/\n/g,'\n'+_.str.repeat(' ',8));

                        //new em
                        o.mapName = '_'+o.funName.toLowerCase();
                        //avoid name conflict
                        var pool = _.get(o.clsStruct, ['sub','Instance', 'sub']);
                        if(pool[o.mapName]){
                            var i=1,t;
                            while(pool[t=o.mapName+'_'+(++i)]){}
                            o.mapName=t;
                        }
                    }

                    return comments+code;
                };
                _.each(eh,function(o,i){
                    var $fun = function(profile, cell){
                        var o = cell.$tagVar;
                        var node = profile.getSubNode('CELL', cell._serialId);
                        linb.ComFactory.newCom('VisualJS.ObjectEditor',function(){
                            this.host = page;
                            this.setProperties({
                                icon:CONF.img_app,
                                iconPos:'-32px -32px',
                                text: getCode(o),
                                caption:o.widgetName+" => "+o.funName,
                                fromRegion:node.cssRegion(true),
                                tagVar:o,
                                onOK:function(page){
                                    this._change();
                                    var tagVar = page.properties.tagVar;
                                    if(page.properties.result.code!==null){
                                        _.set(tagVar.clsStruct, ['sub','Instance', 'sub', tagVar.mapName, 'code'], page.properties.result.code);
                                        _.set(tagVar.clsStruct, ['sub','Instance', 'sub', tagVar.mapName, 'comments'], page.properties.result.comments);

                                        profile.boxing().updateCell(cell, {value:tagVar.mapName});
                                    }else{
                                        _.set(tagVar.clsStruct, ['sub','Instance', 'sub', tagVar.mapName, 'code'], null);
                                        _.set(tagVar.clsStruct, ['sub','Instance', 'sub', tagVar.mapName, 'comments'], null);

                                        var em = _.get(tagVar.clsStruct,['sub','Instance', 'sub','events', 'code']);
                                        if(em){
                                            em=_.unserialize(em);
                                            delete em[tagVar.funName];
                                            _.set(tagVar.clsStruct,['sub','Instance', 'sub','events', 'code'], _.serialize(em));
                                        }

                                        profile.boxing().updateCell(cell,{value:''});
                                    }
                                    node.focus();
                                }
                            });
                            this.show(linb([document.body]));
                        });

                    },
                    $tagVar = {
                         widgetName: 'page',
                         obj : this.properties.clsObject,
                         clsStruct: this.properties.clsStruct,
                         clsObject: this.properties.clsObject,
                         funName: i,
                         mapName:(em&&em[i])||'',
                         ini:o
                    };
                    arr.push({id:'event:'+i, cells:[
                        {value:i, type:null, $tagVar: null, event:null },
                        {value:(em&&em[i])||'', type:'popbox', $tagVar:$tagVar, event:$fun}]
                    });
                },this);
                var rows=[
                    {id:'alias',           cells:[{value:'alias', type:'label'},{value: "page", type:'label'}] },
                    {id:'domId',           cells:[{value:'domId', type:'label'},{value: "*", type:'label'}] },
                    {id:'properties:width', cells:[{value:'width',type:'label'}, {value: pro.properties.width}] },
                    {id:'properties:height',cells:[{value:'height', type:'label'}, {value: pro.properties.height}] },
                    {id:'UIE', cells:[{value:'events',type:'label'}, {value:'...', type:'label'}], sub: arr}
                ];
                var list=[];

                this.profileGrid.insertRows(rows);
                this.profileGrid.get(0).$widget=this.canvas;
            }else{
                var t,len,uis = page.getByCacheId(ids);
                //if exists, give grid info
                if(len = uis._nodes.length){
                    var pro = uis.get(this.SelectedFocus);
                    var cache =[0,0,0,0,0,0,0,0],
                    cache2=0;

                    var $fun = function(profile, cell){
                        var o = cell.$tagVar;
                        var node = profile.getSubNode('CELL', cell._serialId);
                        var obj =o.profile[o.name];
                        linb.ComFactory.newCom('VisualJS.ObjectEditor',function(){
                            this.host = page;
                            this.setProperties({
                                caption:o.widgetName+" => "+o.name,
                                icon:CONF.img_app,
                                iconPos:obj.constructor==Array?'-128px -32px':'-16px -32px',
                                text:linb.Coder.formatText(
                                    _.serialize(
                                        _.clone(obj, function(o,i){return (i+'').charAt(0)!='_'})
                                    )
                                ),
                                fromRegion:node.cssRegion(true),
                                tagVar:o,
                                onOK:function(page){
                                    this._change();
                                    var tagVar = page.properties.tagVar;
                                    tagVar.profile.boxing()[tagVar.funName](page.properties.object);
                                    node.focus();
                                }
                            });
                            this.show(linb([document.body]));
                        });
                    };

                    var rows=[
                            {id:'key', cells:[{value:'class', type:'label'},{value:'<strong>'+pro.key+'</strong>',type:'label'}] },
                            {id:'alias',cells:[{value:'alias', type:'label'},{value:pro.alias}] },
                            {id:'domId',cells:[{value:'domId', type:'label'},{value:pro.domId}] },
                            {id:'properties',   cells:[{value:'properties',type:'label'},{value:'...', type:'label'}], sub:true},
                            {id:'UIE', cells:[{value:'events',type:'label'}, {value:'...', type:'label'}], sub:true},
                            {id:'CS',cells:[{value:'Custom Style', type:'label'},{value:'(Collection)', event:$fun, $tagVar:{
                                name:'CS',
                                funName:'setCustomStyle',
                                profile:pro
                            }, type:'popbox',editorReadonly:true}] },
                            {id:'CC',cells:[{value:'Custom Class', type:'label'},{value:'(Collection)', event:$fun, $tagVar:{
                                name:'CC',
                                funName:'setCustomClass',
                                profile:pro
                            }, type:'popbox',editorReadonly:true}] },
                            {id:'CB',cells:[{value:'Custom Behaviors', type:'label'},{value:'(Collection)', event:$fun, $tagVar:{
                                name:'CB',
                                funName:'setCustomBehavior',
                                profile:pro
                            }, type:'popbox',editorReadonly:true}] },
                            {id:'CF',cells:[{value:'Custom Functions', type:'label'},{value:'(Collection)', event:$fun, $tagVar:{
                                name:'CF',
                                funName:'setCustomFunction',
                                profile:pro
                            }, type:'popbox',editorReadonly:true}] }
                    ];

                    //get properties
                    uis.each(function(t,i){
                        if(i===len-1)return;
                        if(!cache[0] && t.key != pro.key){
                            cache[0]=1;
                            cache2++;
                        }
                        if(!cache[1]){
                            rows[1].cells[1].type='label';
                            cache[1]=1;
                            cache2++;
                        }
                        if(!cache[2] && t.domId!=pro.domId){
                            rows[2].cells[1].type='label';
                            cache[2]=1;
                            cache2++;
                        }

                        if(!cache[5]){
                            rows[5].cells[1].type='label';
                            cache[5]=1;
                            cache2++;
                        }
                        //all *ed
                        if(cache2==7)return false;
                    });
                    this.profileGrid.insertRows(rows);

                    //set target
                    this.profileGrid.get(0).$widget=uis;

                }else{
                    pro= linb.getObject(ids[0]);
                    uis = pro.boxing();

                    var rows=[
                            {id:'key',  cells:[{value:'class',type:'label'},{value: pro.key, type:'label'}] },
                            {id:'alias', cells:[{value:'alias', type:'label'},{value:pro.alias, type:'label'}] },
                            {id:'properties', cells:[{value:'properties',type:'label'},{value:'', type:'label'}], sub:true},
                            {id:'UIE',  cells:[{value:'events',type:'label'},{value:'', type:'label'}], sub:true}
                    ];
                    if(pro.domId)_.arr.insertAny(rows,{id:'domId', cells:[{value:'domId', type:'label'},{value:pro.domId, type:'label'}] },1);
                    this.profileGrid.insertRows(rows);

                    this.profileGrid.get(0).$widget=uis;
                }
            }
        },
        _change:function(){
            this._dirty=true;
            _.tryF(this.events.onValueChanged, [this, null, this._dirty], this.host);
        },

        //avoid to conflict with design code
        $toolbar_onclick:function(profile, item, group, src){
            var page = this, id=item.id;
            switch(group.id){
                case 'code':
                    switch(id){
                        case 'format':
                        case 'json':
                            _.observableRun(function(){
                    	        var dialog = new linb.UI.Dialog();
                    	        dialog.setLeft(100).setTop(100).setWidth(300).setHeight(200).setStatus('max').setMinBtn(false).setMaxBtn(false).setCaption('Formatted code');
                    	        dialog.render();
                    	        var t,nodes;
                    	        if(page.tempSelected && page.tempSelected.length){
                    	            nodes=[];
                    	            _.arr.each(page.tempSelected,function(i){
                    	                nodes.push(linb.getObject(i));
                    	            });
                    	        }else
                    	            nodes = page.getWidgets();

                                var code;
                                switch(id){
                                    case 'format':
                                        code=linb.Coder.formatHTML(page.getJSCode(nodes),'js',['plain']);
                                        break;
                                    case 'json':
                                        code=linb.Coder.formatAll(page.getJSONCode(nodes),'js',['plain']);
                                        break;
                                }
                    	        dialog.setHtml(code);
                    	        dialog.show(linb('body'), true);
                    	    });
                    	break;
                    }
                    break;
                case 'align':
                    this._change();
                    var sel = page.getByCacheId(this.tempSelected);
                    var p = sel.get(this.SelectedFocus),
                        o=p.root,
                        size=o.cssSize(),
                        pos=o.cssPos();
                    sel.each(function(o){
                        if(o.locked)return;
                        var node = o.root;
                        switch(id){
                            case "left":node.left(pos.left);page._refresh(o.boxing(),'left');break;
                            case "center":node.left(pos.left + size.width/2 - node.width()/2);page._refresh(o.boxing(),'left');break;
                            case "right":node.left(pos.left + size.width - node.width());page._refresh(o.boxing(),'left');break;
                            case "top":node.top(pos.top);page._refresh(o.boxing(),'top');break;
                            case "middle":node.top(pos.top + size.height/2 - node.height()/2);page._refresh(o.boxing(),'top');break;
                            case "bottom":node.top(pos.top + size.height - node.height());page._refresh(o.boxing(),'top');break;

                            case 'w':node.width(size.width);page._refresh(o.boxing(),'width');break;
                            case 'wh':node.width(size.width).height(size.height);page._refresh(o.boxing(),'width');page._refresh(o.boxing(),'height');break;
                            case 'h':node.height(size.height);page._refresh(o.boxing(),'height');break;
                        }
                    });
                    this.resizer.rePosSize();
                    this._focus();
                    break;
                case 'pos':
                    this._change();
                    var page=this;
                    var sel = page.getByCacheId(this.tempSelected);
                    if('clone'==id){
                        var ids=[];
                        var t,ids=[],pid;
                        //get source
                        var src = page.getByCacheId(this.tempSelected);
                        //clone and added to its' parent
                        var tar = src.clone();

                        src.get(0).parent.boxing().append(tar);

                        pid=src.get(0).parent.$id;
                        //get ids
                        tar.each(function(o){
                            ids.push(o.$id);
                        });
                        //fire event
                        //_.tryF(this.afterAddWidget, [tar, pid], this);

                        tar.each(function(o){
                            page._designable(o);
                        });

                        //set to resizer
                        this.resizer.resetTarget(linb(tar));

                        linb.message(linb.getRes('VisualJS.designer.colneOK', ids.length));
                        //set selected
                        //this._setSelected(null,true)._setSelected(ids, true);
                        return;
                    }
                    var zIndex=0;
                    _.arr.each(sel,function(o){
                        var ins = o.boxing();
                        var node=ins.reBoxing();

                        switch(id){
                            case "zindex1":
                                if(o.locked)return;
                                if(!zIndex)
                                    zIndex = node.topZindex();
                                node.css('zIndex',zIndex+1);
                                page._refresh(ins,'zIndex');
                                break;
                            case "zindex2":
                                if(o.locked)return;
                                node.css('zIndex',0);
                                page._refresh(ins,'zIndex');
                                break;
                            case "repos":
                            case "resize":
                                if(o.locked)return;
                                var l=node.left(),
                                    t=node.top(),
                                    offset = page.dropOffset;

                                node.left(parseInt(l/offset)*offset)
                                .top(parseInt(t/offset)*offset);
                                if(id=='resize'){
                                    var w=node.width(),
                                        h=node.height();
                                    node.width((parseInt((w+offset-1)/offset))*offset)
                                    .height((parseInt((h+offset-1)/offset))*offset)
                                }
                                page.resizer.rePosSize();
                                page._refresh(ins,'left');
                                page._refresh(ins,'top');
                                page._refresh(ins,'width');
                                page._refresh(ins,'height');
                                break;
                        }
                    });
                    this._focus();
                    break;
                case 'del':
                    this._change();
                    if('delete'==id)this._deleteSelected();

                break;
            }

        },

        $profilegrid_afterrowactive:function(profile, row){
             profile.boxing().editCellbyRowCol(profile, row.id, 'value');
             return false;
        },
        $profilegrid_beforecellvalueset: function(profile, cell,hash){
             this._change();
             var page = this;
             try{
                //get properties
                var attr,t,type,funName,property,value,target=profile.$widget;
                value=hash.value;
                if((attr = cell._row.id.split(':')).length>1){
                    type=attr[0];
                    property=attr[1];
                }else{
                    property=cell._row.id;
                }
                //run
                switch(type){
                    case 'properties':
                        funName = 'set' + _.str.initial(property);
                        //for canvas
                        if(target.get(0) == this.canvas.get(0)){
                            this.canvas[funName](value);
                            this.panelBG[funName](value);
                        }else{
                            target.each(function(o){
                                o.boxing()[funName](value);
                            });
                            if(_.arr.indexOf(['left','top','width','height','right','bottom','dock','dockOrder'],property)!=-1)
                                this.resizer.rePosSize();
                        }
                        break;
                    case 'event':
                        if(target.get(0) == this.canvas.get(0)){
                            if(hash.value){
                                var em = _.get(page.properties.clsStruct,['sub','Instance', 'sub','events', 'code']);
                                if(em)em=_.unserialize(em);else em={};
                                em[property] = hash.value;
                                _.set(page.properties.clsStruct,['sub','Instance', 'sub','events', 'code'], _.serialize(em));
                                _.set(page.properties.clsStruct,['sub','Instance', 'sub','events', 'comments'],
                                    _.get(page.properties.clsStruct,['sub','Instance', 'sub','events', 'comments']) || ('\n'+_.str.repeat(' ',8)) );

                                _.set(page.properties.clsObject,['Instance','events', property], hash.value);
                            }

                        }else
                            target.each(function(o){
                                if(hash.value){
                                    o[property]=hash.value;
                                    //hash.value=... from clsStruct
                                    _.set(page.properties.clsObject,['Instance', property], hash.value);
                                }else
                                    delete o[property];
                            });
                        break;
                    default:
                        if(property=='domId'){
                            //you can modify domId to original one
                            if(target.get(0).$domId!=value && !/^[\w]*$/.test(value)){
                                linb.message(linb.getRes('VisualJS.designer.domIdValid',value));
                                return false;
                            }
                            //if empty, return to original name
                            if(_.str.trim(String(value))==''){
                                value=target.get(0).$domId;
                                _.asyRun(function(){
                                    profile.boxing().updateCell(cell,{value:value});
                                });
                                return false;
                            }
                            //if set to original name, not check dom again
                            if(target.get(0).$domId!=value && linb.Dom.byId(value)){
                                linb.message(linb.getRes('VisualJS.designer.domIdExists',value));
                                return false;
                            }
                            this.listObject.setUIValue(value,true);
                            target.setDomId(value);
                        }else{
                            if(property=='alias'){
                                var hash = this.getNames();
                                if(hash[value]){
                                    linb.message(linb.getRes('VisualJS.designer.nameExists',value));
                                    return false;
                                }
                                this.listObject.setUIValue(value,true);
                            }
                            target[property](value);
                        }
                }
             }catch(e){
                throw(e);
                return false;
             }
        },
        $profilegrid_onrequestdata: function(profile, item, callback, threadId){
            var cv,arr=[],t,page=this,
                id=item.id,
                deeppage=this,
                uis = profile.$widget, len=uis._nodes.length;

            //get the last one first
            var target = uis.get(len-1), dm=target.box.$DataModel, format, listKey, list, $tag,$fun,$tagVar, value,editorReadonly;
            //for properties
            if(id=='properties'){
                _.each(target.box.$DataStruct,function(o,i){
                     if(i.charAt(0)=='_'||i.charAt(0)=='$') return;
                    if(dm[i].hidden) return;

                    list=null;
                    editorReadonly=false;
                    listKey=null;
                     $tag='';
                     cv='';
                    //filter
                    if(dm[i].inner){return}
                    else if(dm[i].readonly){
                        type='label';
                    }else if(dm[i].listbox){
                        type='listbox';
                        list=[];
                        listKey = target.key+":"+"properties"+":"+i;
                        if(_.isFun(dm[i].listbox)){
                            var d = dm[i].listbox;
                            list = function(){
                                var a = d.call(target),list=[];
                                _.arr.each(a,function(o){
                                    list.push({id:o, caption:o, value:o})
                                });
                                return list;
                            };
                        }else if(_.isObj(dm[i].listbox[0]))
                            list = _.copy(dm[i].listbox);
                        else
                            _.arr.each(dm[i].listbox,function(o,i){
                                list.push({id:o, caption:o})
                            });
                        linb.UI.cacheData(listKey, list);
                    }else if(dm[i].combobox){
                        type='combobox';
                        list=[];
                        if(_.isFun(dm[i].combobox)){
                            var d = dm[i].combobox;
                            list = function(){
                                var a = d.call(target),list=[];
                                _.arr.each(a,function(o){
                                    list.push({id:o, caption:o})
                                });
                                return list;
                            };
                        }else{
                            if(_.isObj(dm[i].combobox[0]))
                                list= _.copy(dm[i].combobox);
                            else
                                _.arr.each(dm[i].combobox,function(o,i){
                                    list.push({id:o, caption:o})
                                });
                        }
                        listKey = target.key+":"+"properties"+":"+i;
                        linb.UI.cacheData(listKey, list);
                    }else if(dm[i].helpinput){
                        listKey = target.key+":"+"properties"+":"+i;
                        type='helpinput';
                        list= _.copy(dm[i].helpinput);
                        linb.UI.cacheData(listKey, list);
                    }else if(dm[i].trigger){
                        type='getter';
                        value=i;
                        $fun = function(profile, cell, pro){
                            var o = cell.$tagVar;
                            var f = o.profile.boxing()['trigger'+_.str.initial(o.name)];
                            _.tryF(f,null,o.profile.boxing());

                            var v='try again';
                            pro.boxing().setUIValue(v);
                            profile.boxing().updateCell(cell,{value:v});
                        };
                        $tagVar = {
                            profile: target,
                             name:i
                        };
                    }else if(_.isBool(o)){
                        type='checkbox';
                        $tag = i;
                    }else if(_.isObj(o)){
                        type='popbox';
                        editorReadonly=true;
                        //keep object
                        $tag = null;

                        //for object edit
                        $fun = function(profile, cell){
                            var o = cell.$tagVar;
                            var node = profile.getSubNode('CELL', cell._serialId);
                            var obj =o.profile.boxing()['get'+_.str.initial(o.name)]();
                            linb.ComFactory.newCom('VisualJS.ObjectEditor',function(){
                                this.host = page;
                                this.setProperties({
                                        caption:o.widgetName+" => "+o.name,
                                        icon:CONF.img_app,
                                        iconPos:obj.constructor==Array?'-128px -32px':'-16px -32px',
                                        text:linb.Coder.formatText(
                                            _.serialize(
                                                _.clone(obj, function(o,i){return (i+'').charAt(0)!='_'})
                                            )
                                        ),
                                        fromRegion:node.cssRegion(true),
                                        tagVar:o,
                                        onOK:function(page){
                                            this._change();
                                            var t,tagVar = page.properties.tagVar;
                                            tagVar.profile.boxing()['set'+_.str.initial(o.name)](page.properties.object);

                                            if('dockMargin'==o.name)
                                                deeppage.resizer.rePosSize();

                                            node.focus();

                                            //for new panel
                                            //not consider that multi keys in a widget can have different drop function
                                            if(o.name=='items'){
                                                if(null===page.properties.object)
                                                    tagVar.profile.boxing().setItems([]);

                                                if(t=tagVar.profile.behavior.DropableKeys){
                                                    //_.arr.each(t,function(i){
                                                        var i=t[0];
                                                        deeppage._enablePanelDesignFace(tagVar.profile, i);
                                                    //});
                                                 }
                                            }

                                        }
                                });
                                this.show(linb([document.body]));
                            });
                        };
                        $tagVar = {
                             widgetName:target.alias,
                             profile: target,
                             name:i
                        };
                        cv='(Collection)';
                    }else{
                        type='input';
                    }
                    cv = cv || target.properties[i];
                    if(_.isStr(cv)){
                        //cv=_.serialize(cv);
                        //for serialized string
                        //cv = cv.replace(/^\"/,'').replace(/\"$/,'');
                    }

                    arr.push({id:'properties:'+i, cells:[
                        {value:i},
                        {value:cv, type:type , editorReadonly:editorReadonly, $tag:$tag, event:$fun , $tagVar:$tagVar,  editorListKey:listKey}
                    ]});
                });
            }
            arr.sort(function(x,y){
                x=x.cells[0].value;y=y.cells[0].value;
                return x>y?1:x==y?0:-1;
            });
            //for events
            if(id=='UIE'){
                var getCode=function(o){
                    var code;
                    //get from profile:o.profile[o.funName]
                    var funName = typeof o.profile[o.funName] == 'string'? o.profile[o.funName] : ('_'+o.widgetName.toLowerCase()+'_'+o.funName.toLowerCase());
                    var item = _.get(o.clsStruct, ['sub','Instance', 'sub', funName]);
                    var comments = (item? (item.comments || '') :'');
                    if(comments)comments = comments.replace(/^[\r\n]*/, '');

                    //if em exists
                    if(item&&item.code){
                        code = item&&item.code;
                        o.mapName=funName;
                    //if em doesn't exist
                    }else{
                        code = _.str.repeat(' ',8) + o.ini.toString().replace(/\n/g,'\n'+_.str.repeat(' ',8));

                        //new em
                        o.mapName = '_'+o.widgetName.toLowerCase()+'_'+o.funName.toLowerCase();
                        //avoid name conflict
                        var pool = _.get(o.clsStruct, ['sub','Instance', 'sub']);
                        if(pool[o.mapName]){
                            var i=1,t;
                            while(pool[t=o.mapName+'_'+(++i)]){}
                            o.mapName=t;
                        }
                    }

                    return comments+code;
                };
                //for object edit
                $fun = function(profile, cell){
                    var o = cell.$tagVar;
                    var node = profile.getSubNode('CELL', cell._serialId);
                    linb.ComFactory.newCom('VisualJS.ObjectEditor',function(){
                        this.host = page;
                        this.setProperties({
                            icon:CONF.img_app,
                            iconPos:'-32px -32px',
                            caption:o.widgetName+" => "+o.funName,
                            text: getCode(o),
                            fromRegion:node.cssRegion(true),
                            tagVar:o,
                            onOK:function(page){
                                this._change();
                                var tagVar = page.properties.tagVar;
                                if(page.properties.result.code!==null){
                                    _.set(tagVar.clsStruct, ['sub','Instance', 'sub', tagVar.mapName, 'code'], page.properties.result.code);
                                    _.set(tagVar.clsStruct, ['sub','Instance', 'sub', tagVar.mapName, 'comments'], page.properties.result.comments);

                                    tagVar.profile[tagVar.funName] = tagVar.mapName;
                                    profile.boxing().updateCell(cell,{value:tagVar.mapName});
                                }else{
                                    _.set(tagVar.clsStruct, ['sub','Instance', 'sub', tagVar.mapName, 'code'], null);
                                    _.set(tagVar.clsStruct, ['sub','Instance', 'sub', tagVar.mapName, 'comments'], null);

                                    tagVar.profile[tagVar.funName] = tagVar.profile.box.$EventHandlers[tagVar.funName];
                                    profile.boxing().updateCell(cell, {value:''});
                                }
                                node.focus();
                            }
                        });
                        this.show(linb([document.body]));
                    });

                };

                _.each(target.box.$EventHandlers,function(o,i){
                    $tagVar = {
                         profile: target,
                         clsStruct: page.properties.clsStruct,
                         widgetName: target.alias,
                         funName: i,
                         ini:o
                    };
                    arr.push({id:'event:'+i, cells:[
                        {value:i, type:null, $tagVar:null},
                        {value:typeof target[i]=='string'?target[i]:'', type: 'popbox', $tagVar:$tagVar, event:$fun}
                    ]});
                });
            }
            //check others to disable editable
            uis.each(function(tt,i){
                if(i===(len-1))return;
                if(id=='properties'){
                    var cache=[],cache2=0;
                    _.arr.each(arr,function(o,i){
                        if(cache2 == arr.length)return false;
                        if(!cache[i] && tt.properties[o.cells[0].value] !== target.properties[o.cells[0].value] ){
                            o.cells[1].type='label';
                            cache[i]=1;
                            cache2++;
                        }
                    });
                }
                //multi event disabled
                if(id=='UIE')
                    arr.length=0;
            });
            return arr;
        },
        $iconlist_aftervalueupdated:function(profile, ov, nv){
            if(nv){
                this.resizer.resetTarget(null,false);
                this._setSelected([nv],true);
            }
        },
        $listobject_onlistshow:function(profile, pos){
            var page=this;
//            _.observableRun(function(){
                if(!page.objlistBlock){
                    page.objlistBlock=new linb.UI.Block({
                        width:200,
                        height:200,
                        shadow:true
                    });
                    page.frame=linb.create('<div style="z-index:2000;background-color:red;position:absolute;font-size:0;line-height:0;display:none;">').css('opacity',0.3);
                    linb('body').append(page.frame);

                    page.treebarObj = new linb.UI.TreeBar({
                        group:false,
                        selMode:'none',
                        caption:null
                    },{
                        onItemSelected:function(profile, item, src){
                            page.selectWidget(item.id);
                            profile.parent.root.css('display','none');

                            page.frame.css('display','none');
                            profile.boxing().clearItems();

                            _.asyRun(function(){page._focus()});
                        },
                        beforeHoverEffect:function(profile, item, src, type){
                            if(!item)return;
                            if(item.id==this.canvas.get(0).$id)return;
                            if(type=='mouseover')
                                //for performance in IE
                                _.resetRun('',function(){
                                    var v=linb.getObject(item.id);
                                    if(v && (v=v.root))
                                        page.frame.cssRegion(v.cssRegion(true)).css('display','block');
                                },100);
                            else
                                _.resetRun('',function(){
                                    page.frame.css('display','none');
                                },100);
                        }
                    },page);
                    page.objlistBlock.append(page.treebarObj).render();
                }
                //get items
                var items=[];
                var fun = function(profile, items, map){
                    var self=arguments.callee,t,
                        item = {id:profile.$id, caption:profile.alias, icon: (t=map[profile.box.KEY])?t.icon:'', iconPos:(t=map[profile.box.KEY])?t.iconPos:''};
                    items.push(item);
                    if(profile.children && profile.children.length){
                        var sub=[];
                        item.sub = sub;
                        _.arr.each(profile.children,function(o){
                            self.call(null, o[0], sub, map);
                        });
                    }
                };
                fun(page.canvas.get(0), items, CONF.mapWidgets);
                page.treebarObj.setItems(items).toggleNode(page.canvas.get(0).$id,true);
                var node = page.objlistBlock.reBoxing();
                node.popToTop(profile.root);
                var unFun=function(){
                    node.css('display','none');
                    page.treebarObj.clearItems();
                    page.frame.css('display','none');
                    //unhook
                    linb.Event.keyboardHook('esc');
                };
                //for on blur disappear
                node.setBlurTrigger('design:pop:objecttree', unFun);
                //for esc
                linb.Event.keyboardHook('esc',0,0,0,unFun);

//            });
        },
        $unique:function(arr){
            var i,l,a=_.copy(arr);arr.length=0;
            for(i=0, l=a.length; i<l; i++)
                if(_.arr.indexOf(arr,a[i])==-1)
                    arr[arr.length]=a[i];
           return arr;
        },
//for outter call
        getWidgets:function(flag){
            if(!flag)
                this._clearSelect(this.canvas.get(0));
            var arr=[], c = this.canvas.get(0).children;
            _.arr.each(c,function(o){
                arr.push(o[0]);
            });

            var items = this.iconlist.getItems();
            if(items && items.length)
                _.arr.each(items,function(o,i){
                    arr.push(linb.getObject(o.id));
                });
            return this.$unique(arr);

        },
        getJSONCode:function(nodes){
            //sort by tabindex
            nodes.sort(function(x,y){
                x=parseInt(x.properties.tabindex)||0;y=parseInt(y.properties.tabindex)||0;
                return x>y?1:x==y?0:-1;
            });

            return 'return linb.create(' + _.serialize(nodes) + ').get();'
        },
        getJSCode:function(nodes){
            //sort by tabindex
            nodes.sort(function(x,y){
                x=parseInt(x.properties.tabindex)||0;y=parseInt(y.properties.tabindex)||0;
                return x>y?1:x==y?0:-1;
            });

            var page = this,t,arr=[];
            arr.push('// [[code created by jsLinb UI Builder\n');
            arr.push('var host=this, children=[], append=function(child){children.push(child.get(0))};');
            fun = function(v, pName, argsStr, arr){
                var self=arguments.callee, ui=v.box['linb.UI'], o=v.serialize(false), name=o.alias, b,t,ins=v.boxing();

                delete o.id;

                if(o.properties && o.properties.dropKeys){
                    if(o.properties.dropKeys == v.box.$DataStruct.dropKeys)
                        delete o.properties.dropKeys;
                }

                if(_.isEmpty(o.properties))delete o.properties;
                if(_.isEmpty(o.events))delete o.events;
                if(_.isEmpty(o.CS))delete o.CS;
                if(_.isEmpty(o.CC))delete o.CC;
                if(_.isEmpty(o.CB))delete o.CB;
                if(_.isEmpty(o.CF))delete o.CF;

                arr.push('\n\n');

                if(pName)
                    arr.push(pName+'.append(');
                else
                    arr.push('append(');
                arr.push('(new ' + o.key + ')');
                arr.push('\n    .host(host,"'+name+'")');
                if(o.domId!=o.$domId)
                    arr.push('\n    .setDomId("'+o.domId+'")');
                if(o.properties){ 
                    _.each(o.properties,function(o,i){
                        if(i=='value')return;
                        t='set' + _.str.initial(i);
                        if(typeof ins[t] =='function')
                            arr.push('\n    .' + t + '(' + _.serialize(o) +')');
                    });
                    if(typeof ins.setValue=='function' && 'value' in o.properties)
                        arr.push('\n    .setValue(' + _.serialize(o.properties.value) +')');
                }

                if(o.events){
                    _.each(o.events,function(o,i){
                        arr.push('\n    .' + i + '('+ _.serialize(o) +')');
                    });
                }
                if(o.CS)
                    arr.push('\n    .setCustomStyle('+ _.serialize(o.CS) +')');
                if(o.CC)
                    arr.push('\n    .setCustomClass('+ _.serialize(o.CC) +')');
                if(o.CB)
                    arr.push('\n    .setCustomBehavior('+ _.serialize(o.CB) +')');
                if(o.CF)
                    arr.push('\n    .setCustomFunction('+ _.serialize(o.CF) +')');

                if(pName)
                    arr.push('\n'+(argsStr?(', '+argsStr):'')+');');
                else
                    arr.push('\n);');

                if(v.children && v.children.length){
                    _.arr.each(v.children,function(o){
                        var j = o[0],sa=[],s;
                        for(var i=1;i<o.length;i++){
                            switch(typeof o[i]){
                                case 'number':
                                    sa.push(o[i]);
                                    break;
                                case 'string':
                                    sa.push("'"+o[i]+"'");
                                    break;
                            }
                        }
                        if(sa.length)
                            s = sa.join(',');
                        else
                            s = null;
                        self.call(this, j, 'host.'+name, s,  arr);
                    },this);
                }
            };
            _.arr.each(nodes,function(v){
                fun(v, null, null, arr);
            });
            arr.push('\n\n');
            arr.push('return children;\n');
            arr.push('// ]]code created by jsLinb UI Builder');
            return arr.join('');
        },
        getClassList:function(nodes){
            var page = this,t,hash={};
            var fun = function(target){
                var self=arguments.callee;
                hash[target.box.KEY]=1;
                if(target.children && target.children.length){
                    _.arr.each(target.children,function(o){
                        self.call(null, o[0]);
                    });
                }
            };
            _.arr.each(nodes,function(o){
                fun(o);
            });
            return _.toArr(hash,true);
        },
        getNames:function(){
            var nodes = this.getWidgets(true);
            var page = this,t,hash={};
            var fun = function(target){
                var self=arguments.callee;
                hash[target.alias]=1;
                if(target.children && target.children.length){
                    _.arr.each(target.children,function(o){
                        self.call(null, o[0]);
                    });
                }
            };
            _.arr.each(nodes,function(o){
                fun(o);
            });
            return hash;
        },
        selectWidget:function(id){
            var profile = linb.getObject(id);
            var p = profile.parent;
            if(p.setSelectFromPanel){
                p.setSelectFromPanel.call(p, profile.root.parent(), id);
                this._setSelected([id],true);
            }else{
                this._clearSelect();
                this._setSelected(null,true);
            }
        },
        activate:function(){
        },
        resetEnv:function(text){
            this._dirty=false;
            this.properties.text = text||this.getText();

            this._clearSelect();
            //reset
            this._setSelected([], true);
        },
        setText:function(txt, flag, threadid){
            var self=this;
            txt=txt.replace(/\r\n/g,'\n');
            if(flag || this.properties.text != txt){
                this.properties.text = txt;

                var clsStruct = this.properties.clsStruct;
                var clsObject = this.properties.clsObject;

                var comCode = _.get(clsStruct,['sub','Instance','sub','iniComponents','code']);
                if(comCode == this.properties.comCode)return this;

                var page = this;
//linb.log('rebuild ui')

                linb.Thread.observableRun(threadid,[
                    function(){
                        linb.Dom.setCover(linb.getRes('VisualJS.designer.emptyContent'));
                    },
                    function(){
                        var ns=self.getWidgets();
                        _.arr.each(ns,function(o){
                            o.boxing().destroy();
                        });
                        //page.canvas.reBoxing().empty();
                        //call gc dir
                        linb.Dom.__gc();
                        linb.Dom.setCover(linb.getRes('VisualJS.designer.prepare'));
                    },
                    function(threadid){
                        linb.Thread.suspend(threadid);
                        //load required class and build Coms
                        linb.SC.group(clsObject.Instance.required,function(key){
                            linb.Dom.setCover(linb.getRes('VisualJS.designer.loading')+' ' + key+'...');
                        },function(){
                            linb.Dom.setCover(linb.getRes('VisualJS.designer.createContent'));
                            linb.Thread.resume(threadid);
                        });
                    },
                    function(){
                        try{
                            //var nodes = clsObject.Instance.iniComponents();
                            //avoid call event in desinger
                            var nodes = clsObject.Instance.iniComponents.call(null);

                            page.iconlist.clearItems();

                            var n2 = [];
                            _.filter(nodes,function(target){
                                if(!(target.box['linb.UI'] && !target.box.$noDomRoot)){
                                    n2.push(target);
                                    return false;
                                }
                            });
                            page.canvas.append(linb.UI.pack(nodes, false));
                            _.arr.each(nodes,function(o){
                                page._designable(o);
                            });
                            _.arr.each(n2,function(target){
                                //give design mark
                                target.properties.$design=page.properties.$design;
                                page.iconlist.insertItems([{id:target.$id, image:'img/widgets.gif', iconPos:CONF.mapWidgets[target.box.KEY].iconPos}],null,false);
                            });

                            if(page.layoutBase.reBoxing().css('display')=='none'){
                                page.layoutBase.reBoxing().css('display','block');
                                page.layoutBase.reBoxing().parent().css('background','');
                            }

                        }catch(e){
                            page.iconlist.clearItems();
                            page.canvas.reBoxing().empty();
                            //call gc dir
                            linb.Dom.__gc();
                            //page.properties.text = '';
                            page.layoutBase.reBoxing().css('display','none');
                            page.layoutBase.reBoxing().parent().css('background','url(img/error.gif)');

                            linb.message(linb.getRes('VisualJS.designer.comCodeErr'));
                            linb.message(String(e));
                        }
                    }
                ]);
            }
            //reset
            this.resetEnv(txt);
            return this;
        },
        getText:function(){
            if(this._dirty){
                var nodes = this.getWidgets(), ins = this.properties.clsStruct.sub.Instance;
                //get iniComponents code
                if(!nodes.length){
                    if(_.get(ins,['sub','iniComponents', 'comments']))
                        _.set(ins,['sub','iniComponents','comments'],null);
                }else{
                    if(!_.get(ins,['sub','iniComponents', 'comments']))
                        _.set(ins,['sub','iniComponents','comments'],'\n'+_.str.repeat(' ',8));
                    ins.sub.iniComponents.code =
                        ('function(){\n' +
                        this.getJSCode(nodes)
                        ).replace(/\n/g, '\n'+_.str.repeat(' ',12))+
                        '\n'+_.str.repeat(' ',8)+ '}';
                }

                //get required class list
                var arr = this.properties.clsObject.Instance.required || [];
                var arr2 = this.getClassList(nodes);
                for(var i=0;i<arr2.length;i++)
                    if(_.arr.indexOf(arr,arr2[i])==-1)
                        arr.push(arr2[i]);
                        
                var base=this.properties.clsObject.Instance.base || [];
                _.arr.each(arr,function(o){
                    o=linb.SC(o);
                    if(o.Dependency){
                        for(var i=0;i<o.Dependency.length;i++)
                            if(_.arr.indexOf(base,o.Dependency[i])==-1)
                                base.push(o.Dependency[i]);
                    }
                });
                _.set(ins,['sub','base','code'],_.serialize(base));
                if(!_.get(ins,['sub','base','comments']))
                    _.set(ins,['sub','base','comments'],'\n'+_.str.repeat(' ',8));

                _.set(ins,['sub','required','code'],_.serialize(arr));
                if(!_.get(ins,['sub','required','comments']))
                    _.set(ins,['sub','required','comments'],'\n'+_.str.repeat(' ',8));

                //get all code
                return VisualJS.ClassTool.getCodeFromStruct(this.properties.clsStruct);
            }
            //todo: get text from struct
            return this.properties.text;
        },
        iniComponents:function(){
           // [[code created by jsLinb UI Builder
            var t=this, n=[], u=linb.UI, f=function(c){n.push(c.get(0))};

            f(
            (new u.Layout)
            .host(t,"layoutBase")
            .setLeft(0)
            .setTop(0)
            .setItems([{"id":"main","min":10},{"id":"after","pos":"after","locked":false,"cmd":false,"size":270,"min":100,"max":300,"hide":false}])
            .setType("horizontal")
            );

            t.layoutBase.append(
            (new u.IconList)
            .host(t,"iconlist")
            .setDock("bottom")
            .setHeight(20)
            .setItemWidth(16)
            .setItemHeight(16)
            .setZIndex(10)
            .setItems([])
            .setCustomStyle({KEY:'background:#FFFACD',"ITEMS":"padding:2px"})
            .afterUIValueSet("$iconlist_aftervalueupdated")
            , 'main');

            t.layoutBase.append(
            (new u.ToolBar)
            .host(t,"toolbar")
            .onClick("$toolbar_onclick")
            , 'main');

            t.layoutBase.append(
            (new u.Layout)
            .host(t,"layoutLeft")
            .setLeft(0)
            .setTop(0)
            .setItems([{"id":"main","min":10},{"id":"after","pos":"after","locked":false,"size":300,"min":100,"max":500,"cmd":true,"hide":false}])
            , 'after');

            t.layoutLeft.append(
            (new u.ComboInput)
            .host(t,"listObject")
            .setDock("top")
            .setType("popbox")
            .setReadonly(true)
            .setItems([])
            .onClickButton("$listobject_onlistshow")
            , 'after');

            t.layoutLeft.append(
            (new u.TreeGrid)
            .host(t,"profileGrid")
            .setHeader([{"id":"name","caption":"$VisualJS.designer.gridcol1","width":80,"type":"label"},{"id":"value","caption":"$VisualJS.designer.gridcol2","width":130,"type":"input"}])
            .setRows([])
            .setAltRowsBg(false)
            .setColSortable(false)
            .setEditable(true)
            .beforeCellUpdated("$profilegrid_beforecellvalueset")
            .onGetContent("$profilegrid_onrequestdata")
            .afterRowActive("$profilegrid_afterrowactive")
            , 'after');

            t.layoutLeft.append(
            (new u.TreeBar)
            .host(t,"treebarCom")
            .setLeft(0)
            .setTop(0)
            .setItems([])
            .setGroup(true)
            .setSelMode("none")
            .setDragKey("___iDesign")
            , 'main');

            t.layoutBase.append(
            (new u.Div)
            .host(t,"panelDiv")
            .setDock("fill")
            .onRender(function (pro) {
                pro.root.addClass("linbdesign");
            })
            .setCustomStyle({"KEY":"overflow:auto;"})
            , 'main');

            t.panelDiv.append(
            (new u.Div)
            .host(t,"panelBG")
            .setTop(5)
            .setLeft(5)
            .setCustomStyle({"KEY":"background-color:#FFFEF6;"})
            );

            t.panelBG.append(
            (new u.Div)
            .host(t,"panelBGl")
            .setCustomStyle({"KEY":"font-size:0;line-height:0;position:absolute;left:0;top:0;width:10px;height:100%;background:url(img/designer/left.gif) left top"})
            );

            t.panelBG.append(
            (new u.Div)
            .host(t,"panelBGb")
            .setCustomStyle({"KEY":"font-size:0;line-height:0;position:absolute;left:0;bottom:0;height:10px;width:100%;background:url(img/designer/top.gif) left bottom"})
            );

            t.panelBG.append(
            (new u.Div)
            .host(t,"panelBGt")
            .setCustomStyle({"KEY":"font-size:0;line-height:0;position:absolute;left:0;top:0;height:10px;width:100%;background:url(img/designer/top.gif) left top"})
            );

            t.panelBG.append(
            (new u.Div)
            .host(t,"panelBGr")
            .setCustomStyle({"KEY":"font-size:0;line-height:0;position:absolute;right:0;top:0;width:10px;height:100%;background:url(img/designer/left.gif) top right"})
            );

            t.panelDiv.append(
            (new u.Pane)
            .host(t,"canvas")
            .setTop(5)
            .setLeft(5)
            .setZIndex(10)
            .setCustomStyle({"KEY":"overflow:hidden"})
            );

            return n;
            // ]]code created by jsLinb UI Builder
        }
    },
    Static:{
        destroy:function(){
            this.objlistBlock.destroy();
            arguments.callee.upper.apply(this,arguments);
        }
    },
    Initialize:function(){
        linb.CSS.addStyleSheet(linb.UI.buildCSSText({
            '.linbdesign .panel':{
                'background-image' : 'url(img/designer/bg.gif)',
                'background-position' : 'left top'
            }
        }),'linb.UI.design');
        
        var preLoad=new Image();
        preLoad.src=linb.ini.path +'ondrag.gif';
        preLoad=null;
    }
});