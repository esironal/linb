Class('linb.UI.DatePicker', ['linb.UI',"linb.absValue"], {
    Dependency:['linb.Date'],
    Instance:{
        activate:function(){
            this.getSubNode('PRE').focus();
            return this;
        },
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.renderId)return;
                var cls = profile.box,
                    p = profile.properties,
                    date=linb.Date,
                    mfirst=date.getTimSpanStart(value,'m');
                cls._to(profile,mfirst,value);
                if(profile.keys.CAPTION)
                    profile.getSubNode('CAPTION').html(date.getText(value,'ymd',p.WEEK_FIRST),false);
            });
        },
        getDateFrom:function(){
            return this.get(0)._realstart;
        }
    },
    Initialize:function(){
        var self=this,
            id=linb.UI.$ID,
            cls=linb.UI.$CLS,
            cls2=cls+'-td-free',
            key=self.KEY;
            
        self.addTemplateKeys(['H', 'W','TBODY', 'TD']);
        var colgroup = '<colgroup><col width="2%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/></colgroup>',
            thead1='<thead><tr height="1%"><th id="'+key+'-H:'+id+':7" class="'+cls+'-h #H_CC#"></th>',
            thead2='</tr></thead>',
            th='<th id="'+key+'-H:'+id+':@" class="'+cls+'-h #H_CC#">@</th>',
            tbody1 = '<tbody id="'+key+'-TBODY:'+id +':" >',
            tbody2 = '</tbody>',
            tr1='<tr>',
            tr2='</tr>',
            td1='<th id="'+key+'-W:'+id+':@"  class="'+cls+'-w #W_CC#">@</th>',
            td2='<td id="'+key+'-TD:'+id+':@" class="'+cls+'-td ! #TD_CC#"  unselectable="on" >'+
                '</td>',
            body,i,j,k,l,a=[],b=[];
        for(i=0;i<7;i++)
            b[b.length]= th.replace(/@/g,i);

        k=l=0;
        for(i=0;i<48;i++){
            j=i%8;
            a[a.length]= (j==0?tr1:'') + (j==0?td1:td2).replace(/@/g,j==0?l:k).replace('!',(j==1||j==7)?cls2:'') + (j==7?tr2:'');
            if(j!==0)k++;
            else l++;
        }

        body=colgroup+thead1+b.join('')+thead2+tbody1+a.join('')+tbody2;

        self.setTemplate({
            tagName : 'div',
            style:'{_style};height:auto;',
            onselectstart:'return false',
            BORDER:{
                tagName : 'div',
                BAR:{
                    tagName:'div',
                    className:'uibar-top',
                    style:'{barDisplay};',
                    BART:{
                        cellpadding:"0",
                        cellspacing:"0",
                        width:'100%',
                        border:'0',
                        className:'uibar-t',
                        tagName:'table',
                        BARTR:{
                            tagName:'tr',
                            BARTDL:{
                                tagName:'td',
                                className:'uibar-tdl'
                            },
                            BARTDM:{
                                $order:1,
                                width:'100%',
                                tagName:'td',
                                className:'uibar-tdm'
                            },
                            BARTDR:{
                                $order:2,
                                tagName:'td',
                                className:'uibar-tdr'
                            }
                        }
                    },
                    BARCMDL:{
                        tagName:'div',
                        className:'uibar-cmdl',
                        PRE2:{
                            $order:0,
                            tagName:'a',
                            href:linb.$href,
                            tabindex: '{tabindex}'
                        },
                        PRE:{
                            $order:1,
                            tagName:'a',
                            href:linb.$href,
                            tabindex: '{tabindex}'
                        },
                        YEAR:{$order:2,unselectable:'on',
                            className:'ui-dragable'},
//                        YTXT:{$order:3,style:'display:inline'},
                        MONTH:{$order:4,unselectable:'on',
                            className:'ui-dragable'},
                        MTXT:{$order:5,style:'display:inline'},
                        NEXT:{
                            $order:6,
                            tagName:'a',
                            href:linb.$href,
                            tabindex: '{tabindex}'
                        },
                        NEXT2:{
                            $order:7,
                            tagName:'a',
                            href:linb.$href,
                            tabindex: '{tabindex}'
                        }
                    },
                    BARCMDR:{
                        tagName: 'div',
                        className:'uibar-cmdr',
                        onselectstart:'return false',
                        unselectable:'on',
                        CLOSE:{
                            className:'uicmd-close ',
                            style:'{closeDisplay}'
                        }
                    }
                },
                MAIN:{
                    $order:2,
                    tagName:'div',
                    className:'uicon-main',
                    MAINI:{
                        tagName:'div',
                        className:'uicon-maini',
                        CON:{
                            tagName:'div',
                            BODY:{
                                tagName:'table',
                                cellpadding:"0",
                                cellspacing:"0",
                                width:'100%',
                                text:body
                            }
                        }
                    }
                },
                TAIL:{
                    $order:3,
                    tagName:'div',
                    className:'uicon-main',
                    TAILI:{
                        tagName:'div',
                        className:'uicon-maini',
                        CAPTION:{
                            text : '{caption}',
                            $order:1
                        },
                        TODAY:{
                            className:'ui-btn',
                            TODAYI:{
                                className:'ui-btni',
                                TODAYC:{
                                    className:'ui-btnc',
                                    TODAYA:{
                                        tagName:'a',
                                        href:linb.$href,
                                        tabindex: '{tabindex}',
                                        text:linb.wrapRes('inline.today')
                                    }
                                }
                            }
                        }
                    }
                },
                BBAR:{
                    $order:4,
                    tagName:'div',
                    className:'uibar-bottom-s',
                    BBART:{
                        cellpadding:"0",
                        cellspacing:"0",
                        width:'100%',
                        border:'0',
                        tagName:'table',
                        className:'uibar-t',
                        BBARTR:{
                            tagName:'tr',
                            BBARTDL:{
                                tagName:'td',
                                className:'uibar-tdl'
                            },
                            BBARTDM:{
                                $order:1,
                                width:'100%',
                                tagName:'td',
                                className:'uibar-tdm'
                            },
                            BBARTDR:{
                                $order:2,
                                tagName:'td',
                                className:'uibar-tdr'
                            }
                        }
                    }
                }
            }
        });
    },
    Static:{
        Appearances:{
            KEY:{
                overflow:'visible',
                '-moz-user-select': 'none'
            },
            BORDER:{
                overflow: 'visible',
                position: 'relative'
            },
            BODY:{
                position:'relative'
            },
            BARCMDL:{
                top:'3px'
            },
            TAILI:{
                position:'relative',
                'padding-top':'4px',
                height:'22px',
                'text-align':'center'
            },
            TODAY:{
                position:'absolute',
                top:'0',
                right:'5px'
            },
            'PRE,PRE2,NEXT,NEXT2':{
                $order:0,
                display:linb.$inlineBlock,
                position:'relative',
                margin:'0 2px',
                width:'15px',
                height:'15px',
                'vertical-align': 'middle',
                cursor:'default',
                background: linb.UI.$bg('icons.gif', 'no-repeat', true)
            },
            PRE:{
                $order:1,
                'background-position': '-260px -70px'
            },
            'PRE-mouseover':{
                $order:2,
                'background-position': '-260px -90px'
            },
            'PRE-mousedown':{
                $order:3,
                'background-position': '-260px -110px'
            },
            PRE2:{
                $order:1,
                'background-position': '-240px -70px'
            },
            'PRE2-mouseover':{
                $order:2,
                'background-position': '-240px -90px'
            },
            'PRE2-mousedown':{
                $order:3,
                'background-position': '-240px -110px'
            },
            NEXT:{
                $order:1,
                'background-position': '-280px -70px'
            },
            'NEXT-mouseover':{
                $order:2,
                'background-position': '-280px -90px'
            },
            'NEXT-mousedown':{
                $order:3,
                'background-position': '-280px -110px'
            },
            NEXT2:{
                $order:1,
                'background-position': '-300px -70px'
            },
            'NEXT2-mouseover':{
                $order:2,
                'background-position': '-300px -90px'
            },
            'NEXT2-mousedown':{
                $order:3,
                'background-position': '-300px -110px'
            },
            'YEAR,MONTH':{
                $order:4,
                margin:'0 2px',
                height:'15px',
                'font-weight':'bold',
                'vertical-align': 'middle',
                border:'1px solid #779EBF',
                'background-color':'#F8FBFF',
                'padding-left':'2px',
                cursor:'e-resize'
            },
            YEAR:{
                width:'32px'
            },
            MONTH:{
                width:'16px'
            },
            CAPTION:{
                'font-size':'12px',
                'vertical-align':'middle'
            },
            MAINI:{
                'padding-top':'4px',
                'padding-bottom':'4px'
            },
            CON:{
                'border-left':'solid 1px #648CB4',
                'border-top':'solid 1px #648CB4'
            },
            BODY:{
                overflow: 'visible'
            },
            'BODY td,BODY th':{
                $order:1,
                border:0,
                'border-right':'solid 1px #648CB4',
                'border-bottom':'solid 1px #648CB4'
            },
            'TD .exday':{
                color:'#C1C1C1'
            },
            TD:{
                'text-align':'center',
                'background-color': '#EFF8FF'
            },
            'TD-free':{
                $order:1,
                'text-align':'center',
                'background-color': '#F9F7D1'
            },
            'TD-mouseover':{
                $order:3,
                'background-color': '#d9e8fb'
            },
            'TD-checked':{
                $order:4,
                'background-color':'#316AC5',
                'font-weight':'bold',
                color:'#fff'
            },
            'W,H':{
                $order:3,
                'color':'#333333',
                'background-color':'#E8EEF7',
                'vertical-align':'middle',
                'text-align':'center'
            }
        },
        Behaviors:{
            HoverEffected:{CLOSE:'CLOSE',TD:'TD',PRE:'PRE',PRE2:'PRE2',NEXT:'NEXT',NEXT2:'NEXT2',TODAY:'TODAY'},
            ClickEffected:{CLOSE:'CLOSE',TD:'TD',PRE:'PRE',PRE2:'PRE2',NEXT:'NEXT',NEXT2:'NEXT2',TODAY:'TODAY'},
            KEY:{onClick:function(){return false}},
            TD:{
                onClick:function(profile, e, src){
                    var p=profile.properties,
                        id=profile.getSubId(src),
                        map=profile.$daymap,
                        v=map[id];
                    if(p.disabled)return false;

                    linb.use(src).onMouseout(true,{$force:true});
                    //onClick event
                    profile.boxing().setUIValue(v);
                }
            },
            TODAY:{
                onClick:function(profile){
                    profile.boxing().setUIValue(new Date,true);
                }
            },
            CLOSE:{
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        instance = profile.boxing();
                    if(properties.disabled)return;
                    if(false===instance.beforeClose(profile, src)) return;
                    instance.destroy();
                    //for design mode in firefox
                    return false;
                }
            },
            PRE:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled)return;
                    profile.box._to(profile, linb.Date.add(profile.$mfirst,'m',-1,p.WEEK_FIRST));
                }
            },
            NEXT:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled)return;
                    profile.box._to(profile, linb.Date.add(profile.$mfirst,'m',1,p.WEEK_FIRST));
                }
            },
            PRE2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled)return;
                    profile.box._to(profile, linb.Date.add(profile.$mfirst,'y',-1,p.WEEK_FIRST));
                }
            },
            NEXT2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled)return;
                    profile.box._to(profile, linb.Date.add(profile.$mfirst,'y',1,p.WEEK_FIRST));
                }
            },
            YEAR:{
                onMousedown:function(profile, e, src){
                    linb.use(src).startDrag(e, {
                        dragType:'blank',
                        targetReposition:false,
                        widthIncrement:20,
                        dragCursor:true
                    });
                    profile.$temp=profile.$temp2=0;
                },
                onDrag:function(profile, e, src){
                    var count,off = linb.DragDrop.getProfile().offset;
                    count=parseInt(profile.$year)+(profile.$temp2=parseInt(off.x/20));
                    if(profile.$temp!=count){
                        profile.$temp=count;
                        profile.getSubNode('YEAR').html(count,false);
                    }
                },
                onDragstop:function(profile, e, src){
                    if(profile.$temp2){
                        var p=profile.properties,
                            v = linb.Date.add(profile.$mfirst,'y',profile.$temp2,p.WEEK_FIRST);
                        profile.box._to(profile,linb.Date.getTimSpanStart(v,'m'));
                    }
                    profile.$temp=profile.$temp2=0;
                }
            },
            MONTH:{
                onMousedown:function(profile, e, src){
                    linb.use(src).startDrag(e, {
                        dragType:'blank',
                        targetReposition:false,
                        widthIncrement:20,
                        dragCursor:true
                    });
                    profile.$temp=profile.$temp2=0;
                },
                onDrag:function(profile, e, src){
                    var count,off = linb.DragDrop.getProfile().offset;
                    count=parseInt(profile.$month)+(parseInt(off.x/20)%12);
                    count=(count%12+12)%12;
                    if(profile.$temp!=count){
                        profile.$temp=count;
                        profile.$temp2=count-profile.$month+1;
                        profile.getSubNode('MONTH').html(count+1,false);
                    }
                },
                onDragstop:function(profile, e, src){
                    if(profile.$temp2){
                        var p=profile.properties,
                            v = linb.Date.add(profile.$mfirst,'m',profile.$temp2,p.WEEK_FIRST);
                        profile.box._to(profile,linb.Date.getTimSpanStart(v,'m'));
                    }
                    profile.$temp=profile.$temp2=0;
                }
            }
        },
        DataModel:{
            height:{
                ini:'auto',
                readonly:true
            },
            width:{
                ini:210,
                readonly:true
            },
            value:new Date,
            closeBtn:{
                ini:true,
                action:function(v){
                    this.getSubNode('CLOSE').css('display',v?'':'none');
                }
            }
        },
        EventHandlers:{
            beforeClose:function(profile, src){}
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            var nodisplay='display:none';
            data.closeDisplay = data.closeBtn?'':nodisplay;
            return data;
        },
        RenderTrigger:function(){
            var self=this, p=self.properties, o=self.boxing(), b=self.box;
            b._setWeekLabel(self);
//            self.getSubNode('YTXT').html(linb.wrapRes('date.Y'),false);
//            self.getSubNode('MTXT').html(linb.wrapRes('date.M'),false);
        },
        _getWeekNodes:function(profile){
            return profile.$week || (profile.$week=profile.getSubNode('W',true));
        },
        _getTDNodes:function(profile){
            return profile.$tds || (profile.$tds=profile.getSubNode('TD',true));
        },
        _getLabelNodes:function(profile){
            return profile.$day || (profile.$day=profile.getSubNode('TD',true));
        },
        _getHeaderNodes:function(profile){
            return profile.$header || (profile.$header=profile.getSubNode('H',true));
        },
        _setWeekLabel:function(profile){
            var o=linb.Date,f=profile.getSubId;
            profile.box._getHeaderNodes(profile).each(function(node,i){
                node.innerHTML=linb.wrapRes('date.WEEKS.'+f(node.id))
            });
        },
        _setBGV:function(profile, v, m){
            var date=linb.Date,
                p=profile.properties,
                daymap=profile.$daymap||(profile.$daymap=[]),
                t,n,
                fd=p.WEEK_FIRST;
            profile.box._getLabelNodes(profile).each(function(node,i){
                n=date.add(v,'d',i,fd);
                daymap[i]=n;
                t=date.get(n,'m',fd)==m?'#':'<p class="exday">#</p>';
                n=date.get(n,'d',fd);
                node.innerHTML = t.replace('#',n);
            });
            profile.box._getWeekNodes(profile).each(function(node,i){
                node.innerHTML=date.get(date.add(v,'ww',i,fd),'ww',fd);
            });
        },
        _to:function(profile, mfirst, value){
            var p = profile.properties,
                fd=p.WEEK_FIRST,
                date=linb.Date,
                keys=profile.keys,
                uiv=value||p.$UIvalue,
                md=date.get(uiv,'m',fd)+'-'+date.get(uiv,'d',fd),
                ym1=date.get(uiv,'y',fd)+'-'+date.get(uiv,'m',fd),
                ym2=date.get(mfirst,'y',fd)+'-'+date.get(mfirst,'m',fd),
                index=-1,
                node,
                temp,
                _realstart = date.getTimSpanStart(date.getTimSpanStart(mfirst,'m'),'ww',1,fd),
                m=date.get(mfirst,'m',fd);

            profile.$mfirst=mfirst;
            this._setBGV(profile, profile._realstart=_realstart, m);


            //remove checked css class
            if(profile.$selnode)
                profile.$selnode.tagClass('-checked',false);
            if(ym1==ym2){
                _.arr.each(profile.$daymap,function(o,i){
                    if(date.get(o,'m',fd)+'-'+date.get(o,'d',fd)==md){
                        index=i;
                        return false;
                    }
                });
                node=this._getTDNodes(profile).get()[index];
                (profile.$selnode=linb([node]).tagClass('-checked'));
            }

            if(keys.YEAR){
                temp=date.get(mfirst,'y',fd);
                if(profile.$year!=temp){
                    profile.$year=temp;
                    profile.getSubNode('YEAR').html(temp,false);
                }
            }
            if(keys.MONTH){
                temp=date.get(mfirst,'m',fd)+1;
                if(profile.$month!=temp){
                    profile.$month=temp;
                    profile.getSubNode('MONTH').html(temp,false);
                }
            }
        },
        _onresize:function(){}
    }
});