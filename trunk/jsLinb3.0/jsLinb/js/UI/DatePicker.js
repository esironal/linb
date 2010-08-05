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
                    p = profile.properties;
                cls._to(profile,value,true);
                if(profile.keys.CAPTION)
                    profile.getSubNode('CAPTION').html(linb.Date.getText(value,'ymd'),false);
            });
        },
        getDateFrom:function(){
            return this.get(0)._realstart;
        }
    },
    Initialize:function(){
        var self=this,
            id=linb.UI.$ID,
            tag=linb.UI.$tag_special,
            cls=linb.UI.$CLS,
            cls2=cls+'-td-free',
            key=self.KEY;
            
        self.addTemplateKeys(['H', 'COL', 'W','TBODY', 'TD']);
        var colgroup = '<colgroup id="'+key+'-COL:'+id+'"  class="'+tag+'COL_CS'+tag+'"  style="'+tag+'COL_CS'+tag+'"><col width="2%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/></colgroup>',
            thead1='<thead><tr height="1%"><th id="'+key+'-H:'+id+':7" class="'+cls+'-h '+tag+'H_CC'+tag+'" style="'+tag+'H_CS'+tag+'"></th>',
            thead2='</tr></thead>',
            th='<th id="'+key+'-H:'+id+':@" class="'+cls+'-h '+tag+'H_CC'+tag+'"  style="'+tag+'H_CS'+tag+'">@</th>',
            tbody1 = '<tbody id="'+key+'-TBODY:'+id +':"  class="'+tag+'TBODY_CS'+tag+'"  style="'+tag+'TBODY_CS'+tag+'" >',
            tbody2 = '</tbody>',
            tr1='<tr>',
            tr2='</tr>',
            td1='<th id="'+key+'-W:'+id+':@"  class="'+cls+'-w '+tag+'W_CC'+tag+'"  style="'+tag+'W_CS'+tag+'">@</th>',
            td2='<td id="'+key+'-TD:'+id+':@" class="'+cls+'-td ! '+tag+'TD_CC'+tag+'"  style="'+tag+'TD_CS'+tag+'" '+linb.$IEUNSELECTABLE+' >'+
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
                            tabindex: '{tabindex}'
                        },
                        PRE:{
                            $order:1,
                            tabindex: '{tabindex}'
                        },
                        YEAR:{
                            $order:2,
                            className:'ui-draggable'
                        },
                        YTXT:{$order:3,text:'-'},
                        MONTH:{
                            $order:4,
                            className:'ui-draggable'
                        },
                        MTXT:{$order:5,text:'-'},
                        DAY:{
                            $order:6
                        },
                        NEXT:{
                            $order:7,
                            tabindex: '{tabindex}'
                        },
                        NEXT2:{
                            $order:8,
                            tabindex: '{tabindex}'
                        }
                    },
                    BARCMDR:{
                        tagName: 'div',
                        className:'uibar-cmdr',
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
                            tagName:'div',
                            style:'{_nocap}',
                            text : '{caption}',
                            $order:0
                        },
                        TIME:{
                            style:"{_timectrl}",
                            tagName:'div',
                            TPRE2:{
                                $order:0,
                                tabindex: '{tabindex}'
                            },
                            TPRE:{
                                $order:1,
                                tabindex: '{tabindex}'
                            },
                            HOUR:{
                                $order:2,
                                className:'ui-draggable'
                            },
                            MTXT:{$order:3,text:':'},
                            MINUTE:{
                                $order:4,
                                className:'ui-draggable'
                            },
                            TNEXT:{
                                $order:6,
                                tabindex: '{tabindex}'
                            },
                            TNEXT2:{
                                $order:7,
                                tabindex: '{tabindex}'
                            }
                        },
                        TODAY:{
                             tabindex: '{tabindex}'
                        },
                        SET:{
                            className:'ui-btn',
                            SETI:{
                                className:'ui-btni',
                                SETC:{
                                    className:'ui-btnc',
                                    SETA:{
                                        tabindex: '{tabindex}',
                                        text:linb.wrapRes('inline.set')
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
                overflow:'visible'
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
                height:'24px'
            },
            TIME:{
                'padding':'2px'
            },
            SET:{
                position:'absolute',
                display:'none',
                color:'#ff0000',
                top:'0',
                right:'5px'
            },
            TODAY:{
                position:'absolute',
                top:'3px',
                left:'0',
                display:linb.$inlineBlock,
                width:'16px',
                height:'16px',
                cursor:'default',
                background: linb.UI.$bg('icons.gif', 'no-repeat right top', true),
                _zoom:1
            },
            'TODAY-mouseover':{
                'background-position': 'right -20px'
            },
            'TODAY-mousedown':{
                'background-position': 'right -40px'
            },
            'PRE,PRE2,NEXT,NEXT2,TPRE,TPRE2,TNEXT,TNEXT2':{
                $order:0,
                display:linb.$inlineBlock,
                position:'relative',
                margin:'0 2px',
                width:'15px',
                height:'15px',
                'vertical-align': 'middle',
                cursor:'default',
                background: linb.UI.$bg('icons.gif', 'no-repeat', true),
                _zoom:1
            },
            'PRE, TPRE':{
                $order:1,
                'background-position': '-260px -70px'
            },
            'PRE-mouseover, TPRE-mouseover':{
                $order:2,
                'background-position': '-260px -90px'
            },
            'PRE-mousedown, TPRE-mousedown':{
                $order:3,
                'background-position': '-260px -110px'
            },
            'PRE2, TPRE2':{
                $order:1,
                'background-position': '-240px -70px'
            },
            'PRE2-mouseover, TPRE2-mouseover':{
                $order:2,
                'background-position': '-240px -90px'
            },
            'PRE2-mousedown, TPRE2-mousedown':{
                $order:3,
                'background-position': '-240px -110px'
            },
            'NEXT, TNEXT':{
                $order:1,
                'background-position': '-280px -70px'
            },
            'NEXT-mouseover, TNEXT-mouseover':{
                $order:2,
                'background-position': '-280px -90px'
            },
            'NEXT-mousedown, TNEXT-mousedown':{
                $order:3,
                'background-position': '-280px -110px'
            },
            'NEXT2, TNEXT2':{
                $order:1,
                'background-position': '-300px -70px'
            },
            'NEXT2-mouseover, TNEXT2-mouseover':{
                $order:2,
                'background-position': '-300px -90px'
            },
            'NEXT2-mousedown, TNEXT2-mousedown':{
                $order:3,
                'background-position': '-300px -110px'
            },
            'YEAR,MONTH,DAY,HOUR,MINUTE':{
                $order:4,
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
            'MONTH, DAY,HOUR, MINUTE':{
                width:'16px'
            },
            CAPTION:{
                padding:'4px 0 0 0',
                'text-align':'center',
                'font-size':'12px',
                'vertical-align':linb.browser.ie6?'baseline':'middle'
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
            HoverEffected:{CLOSE:'CLOSE',TD:'TD',PRE:'PRE',PRE2:'PRE2',NEXT:'NEXT',NEXT2:'NEXT2',TPRE:'TPRE',TPRE2:'TPRE2',TNEXT:'TNEXT',TNEXT2:'TNEXT2',SET:'SET', TODAY:'TODAY'},
            ClickEffected:{CLOSE:'CLOSE',TD:'TD',PRE:'PRE',PRE2:'PRE2',NEXT:'NEXT',NEXT2:'NEXT2',TPRE:'TPRE',TPRE2:'TPRE2',TNEXT:'TNEXT',TNEXT2:'TNEXT2',SET:'SET', TODAY:'TODAY'},
            KEY:{onClick:function(){return false}},
            TD:{
                onClick:function(profile, e, src){
                    var p=profile.properties,
                        id=profile.getSubId(src),
                        map=profile.$daymap,
                        v=map[id];
                    if(p.disabled||p.readonly)return false;

                    linb.use(src).onMouseout(true,{$force:true});

                    v = linb.Date.add(profile.$tempValue, 'd', linb.Date.diff(profile.$tempValue, v, 'd'));
                    profile.box._to(profile,v);
                    
                    // set dir
                    if(!p.timeInput)
                        //onClick event
                        profile.boxing().setUIValue(v);
                }
            },
            TODAY:{
                onClick:function(profile,e,src){
                    linb.use(src).onMouseout(true,{$force:true});
                    profile.boxing().setUIValue(
                        profile.properties.timeInput ?
                        new Date :
                        linb.Date.getTimSpanStart(new Date,'d',1)
                    ,true);
                }
            },
            SET:{
                onClick:function(profile,e,src){
                    linb.use(src).onMouseout(true,{$force:true});
                    profile.boxing().setUIValue(profile.$tempValue, true);
                }
            },
            CLOSE:{
                onClick:function(profile, e, src){
                    var p = profile.properties,
                        instance = profile.boxing();
                    if(p.disabled||p.readonly)return;
                    if(false===instance.beforeClose(profile, src)) return;
                    instance.destroy();
                    //for design mode in firefox
                    return false;
                }
            },
            PRE:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,linb.Date.add(profile.$tempValue,'m',-1));
                }
            },
            NEXT:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,linb.Date.add(profile.$tempValue,'m',1));
                }
            },
            PRE2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,linb.Date.add(profile.$tempValue,'y',-1));
                }
            },
            NEXT2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,linb.Date.add(profile.$tempValue,'y',1));
                }
            },
            TPRE:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,linb.Date.add(profile.$tempValue,'n',-1));
                }
            },
            TNEXT:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,linb.Date.add(profile.$tempValue,'n',1));
                }
            },
            TPRE2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,linb.Date.add(profile.$tempValue,'h',-1));
                }
            },
            TNEXT2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,linb.Date.add(profile.$tempValue,'h',1));
                }
            },
            YEAR:{
                onMousedown:function(profile, e, src){
                    return profile.box._ondown(profile,e,src,10);
                },
                onDrag:function(profile, e, src){
                    var count,off = linb.DragDrop.getProfile().offset;
                    count=parseInt(profile.$year)+(profile.$temp2=parseInt(off.x/10));
                    if(profile.$temp!=count){
                        profile.$temp2=profile.$temp=count;
                        profile.getSubNode('YEAR').html(count,false);
                    }
                },
                onDragstop:function(profile, e, src){
                    return profile.box._onds(profile,e,src,'y');
                }
            },
            MONTH:{
                onMousedown:function(profile, e, src){
                    return profile.box._ondown(profile,e,src,20);
                },
                onDrag:function(profile, e, src){
                    var count,off = linb.DragDrop.getProfile().offset;
                    count=parseInt(profile.$month)+(parseInt(off.x/20)%12);
                    count=(count%12+12)%12;
                    if(profile.$temp!=count){
                        profile.$temp=count;
                        profile.$temp2=count-profile.$month+1;
                        profile.getSubNode('MONTH').html(((count+1)<=9?"0":"")+(count+1),false);
                    }
                },
                onDragstop:function(profile, e, src){
                    return profile.box._onds(profile,e,src,'m');
                }
            },
            DAY:{
                onMousedown:function(profile, e, src){
                    return profile.box._ondown(profile,e,src,10);
                },
                onDrag:function(profile, e, src){
                    var date=new Date(profile.$year,profile.$month,0),
                        days=date.getDate();

                    var p=profile.properties,
                        count,
                        off = linb.DragDrop.getProfile().offset;
                    count=parseInt(profile.$day)+(parseInt(off.x/10)%days);
                    count=(count%days+days)%days + 1;
                    if(profile.$temp!=count){
                        profile.$temp=count;
                        profile.$temp2=count-profile.$day;
                        profile.getSubNode('DAY').html((count<=9?"0":"")+count,false);
                    }
                },
                onDragstop:function(profile, e, src){
                    return profile.box._onds(profile,e,src,'d');
                }
            },
            HOUR:{
                onMousedown:function(profile, e, src){
                    return profile.box._ondown(profile,e,src,20);
                },
                onDrag:function(profile, e, src){
                    return profile.box._ondrag(profile,20,24,'HOUR',profile.$hour);
                },
                onDragstop:function(profile, e, src){
                    return profile.box._onds(profile,e,src,'h');
                }
            },
            MINUTE:{
                onMousedown:function(profile, e, src){
                    return profile.box._ondown(profile,e,src,10);
                },
                onDrag:function(profile, e, src){
                    return profile.box._ondrag(profile,10,60,'MINUTE',profile.$minute);
                },
                onDragstop:function(profile, e, src){
                    return profile.box._onds(profile,e,src,'n');
                }
            }
        },
        DataModel:{
            timeInput:{
                ini:false,
                action:function(v){
                    this.getSubNode('CAPTION').css('display',v?'none':'block');
                    this.getSubNode('SET').css('display',v?'block':'none');
                    this.getSubNode('TIME').css('display',v?'block':'none');
                }
            },
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
            
            var none="display:none;";
            if(profile.properties.timeInput)
                data._nocap=none;
            else
                data._timectrl=none;

            return data;
        },
        _ensureValue:function(profile, value){
            var d;
            if(value){
                if(_.isDate(value))
                    d=value;
                else if(_.isFinite(value))
                    d=new Date(parseInt(value));
            }
            d = d||new Date;
            if(!profile.properties.timeInput)
                d=linb.Date.getTimSpanStart(d,'d');
            return d;
        },
        RenderTrigger:function(){
            var self=this, p=self.properties, o=self.boxing(), b=self.box;
            b._setWeekLabel(self);
//            self.getSubNode('YTXT').html(linb.wrapRes('date.Y'),false);
//            self.getSubNode('MTXT').html(linb.wrapRes('date.M'),false);
        },
        _getWeekNodes:function(profile){
            return profile.$weeks || (profile.$weeks=profile.getSubNode('W',true));
        },
        _getTDNodes:function(profile){
            return profile.$tds || (profile.$tds=profile.getSubNode('TD',true));
        },
        _getLabelNodes:function(profile){
            return profile.$days || (profile.$days=profile.getSubNode('TD',true));
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
                t,n;
            profile.box._getLabelNodes(profile).each(function(node,i){
                n=date.add(v,'d',i);
                daymap[i]=n;
                t=date.get(n,'m')==m?'#':'<p class="exday">#</p>';
                n=date.get(n,'d');
                node.innerHTML = t.replace('#',n);
            });
            profile.box._getWeekNodes(profile).each(function(node,i){
                node.innerHTML=date.get(date.add(v,'ww',i),'ww');
            });
        },
        _to:function(profile, time, force){
            var p = profile.properties,
                date=linb.Date,
                keys=profile.keys,
                uiv=p.$UIvalue,
                index=-1,
                node,
                temp,
                _realstart = date.getTimSpanStart(date.getTimSpanStart(time,'m'),'ww',1),
                m=date.get(time,'m');

            profile.$tempValue=time;
            this._setBGV(profile, profile._realstart=_realstart, m);

            //remove checked css class
            if(profile.$selnode)
                profile.$selnode.tagClass('-checked',false);
            //[[add cecked css class
            _.arr.each(profile.$daymap,function(o,i){
                if(date.get(o,'m')+'-'+date.get(o,'d')==date.get(time,'m')+'-'+date.get(time,'d')){
                    index=i;
                    return false;
                }
            });
            node=this._getTDNodes(profile).get()[index];
            (profile.$selnode=linb([node]).tagClass('-checked'));
            //]]
            
            //[[ show dirty
            profile.getSubNode('SET').css('display',(force||uiv.getTime()==time.getTime())?'none':'block');
            profile.getSubNode('CAPTION').css('color',(force||uiv.getTime()==time.getTime())?'':'#ff0000');
            //]]

            temp=date.get(time,'y');
            if(profile.$year!=temp){
                profile.$year=temp;
                profile.getSubNode('YEAR').html(temp,false);
            }
            temp=date.get(time,'m')+1;
            if(profile.$month!=temp){
                profile.$month=temp;
                profile.getSubNode('MONTH').html((temp<=9?"0":"")+temp,false);
            }
            temp=date.get(time||time,'d');
            if(profile.$day!=temp){
                profile.$day=temp;
                profile.getSubNode('DAY').html((temp<=9?"0":"")+temp,false);
            }
            temp=date.get(time,'h');
            if(profile.$hour!=temp){
                profile.$hour=temp;
                profile.getSubNode('HOUR').html((temp<=9?"0":"")+temp,false);
            }
            temp=date.get(time,'n');
            if(profile.$minute!=temp){
                profile.$minute=temp;
                profile.getSubNode('MINUTE').html((temp<=9?"0":"")+temp,false);
            }
        },
        _ondown:function(profile, e, src,increment){
            if(linb.Event.getBtn(e)!="left")return;
            linb.use(src).startDrag(e, {
                dragType:'blank',
                targetReposition:false,
                widthIncrement:increment,
                dragCursor:true
            });
            profile.$temp=profile.$temp2=0;
        },
        _ondrag:function(profile,increment,max,key,data){
            var p=profile.properties,
                count,
                off = linb.DragDrop.getProfile().offset;
            count=parseInt(data)+(parseInt(off.x/increment)%max);
            count=(count%max+max)%max;
            if(profile.$temp!=count){
                profile.$temp=count;
                profile.$temp2=count-data;
                profile.getSubNode(key).html((count<=9?"0":"")+count,false);
            }
        },
        _onds:function(profile, e, src, type){
            if(profile.$temp2){
                var p=profile.properties,
                    v = linb.Date.add(profile.$tempValue,type,profile.$temp2);
                profile.box._to(profile,v);
            }
            profile.$temp=profile.$temp2=0;
        },
        _onresize:function(){}
    }
});