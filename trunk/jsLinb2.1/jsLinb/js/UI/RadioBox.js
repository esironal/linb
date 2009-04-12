Class("linb.UI.RadioBox", "linb.UI.List",{
    Initialize:function(){
        //modify default template for shell
        var t = this.getTemplate();
        t.$dynamic={
            items:{
                ITEM:{
                    className:'{itemClass}  {disabled}',
                    style:'{itemStyle}',
                    tagName: 'a',
                    href :linb.$href,
                    tabindex: '{_tabindex}',
                    MARK:{
                        $order:0,
                        className:'uicmd-radio'
                    },
                    ICON:{
                        style:'background:url({image}) transparent  no-repeat {imagePos};{iconDisplay}',
                        className:'ui-icon',
                        $order:1
                    },
                    CAPTION:{
                        text : '{caption}',
                        $order:2
                    }
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        DIRTYKEY:'MARK',
        Appearances:{
            ITEM:{
               display:linb.$inlineBlock,
               zoom:linb.browser.ie6?1:null,
               'font-family':' "Verdana", "Helvetica", "sans-serif"',
               border:0,
               padding:'4px',
               position:'relative',
               zoom:linb.browser.ie?1:null,
               cursor:'pointer',
               overflow:'hidden',
               'vertical-align':'middle',
               'font-size':'12px'
            },
            CAPTION:{
                'vertical-align':'middle'
            },
            ITEMS:{
                overflow:'auto',
                'overflow-x': (linb.browser.ie || linb.browser.gek)?'hidden':'',
                position:'relative',
                'line-height':'14px'
            }
        },Behaviors:{
            HoverEffected:{ITEM:'MARK'},
            ClickEffected:{ITEM:'MARK'}
        }
    }
});
