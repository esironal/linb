(linb.Locale.en||(linb.Locale.en={})).VisualJS={
    message:"System message!",
    noMessage:"Welcome to VisualJS, an Ajax/Javascript UI Builder!",
    soon:'Coming soon',
    ok:'OK',
    cancel:'Cancel',
    'close':'Close',
    notsave:'Not save',
    notsave2:'You are about to close a file without saving it.<p>Click [Yes] to discard and continue or [No] to go back for saving.',
    notsave3:'You have NOT saved your modifications before debugging.<p>Click [Yes] to continue anyway or [No] to go back for saving.',
    checkOK:'Congratulations! No syntax error yet!',
    en:'English',
    cn:'Chinese',
    ja:"Japanese",
    tw:'Traditional Chinese',
    ru:'Russian',
    langTips:'Switch Locale',
    
    spabuilder:{
        nosavefirst:'You have unsaved changed. Are you sure you want to discard current changes?',
        menubar:{
            servicetester:'LINB Service Tester',
            backendcode:'Back-end Service Code',
            php:'PHP Code',
            csharp:'C# Code',
            java:'JAVA Code',
            links:'Links',
            linb:'linb.net website',
            gcodelist:'Google Code Download List',
            cookbook:'CookBook',
            api:'API Documentation',
            codesnipt:'Code Snippet',
            forum:'Forum',
            jsoneditor:'JSON Editor',
            adv:'Builder Advanced Version',
            commecial:'Commercial Support',
            video:'Introduction Video',
            about:'About'
        },
        st_title:"LINB Service Test",
        st_nodata:"Need to check your uri or query object!",
        st_uri:"Service URI",
        st_queryobj:"Request Query Object",
        st_createcode:"Create Request Code",
        st_send:"Send Testing Request To Service",
        st_sending:"Trying...",
        st_result:"Result",
        st_format:"Format",
        st_mothod:"Query Method"
    },
    
    builder:{
        open:'Open',
        openTips:'Save or download file.',
        save:'Save',
        saveTips:'Save or download file.',
        run:'Run',
        runTips:'Run jsLinb Class in debug page.',
        dftTheme:'Default Theme',
        dftThemeTips:'To switch theme',
        advancedBuilder:'Advanced',
        originalFile:"Original file: ",
        issave2server:"Do you mean to overwrite the original server file?",
        save2serverOK:'Saved to server successfully',
        nosavefirst:'You have unsaved changed. Are you sure you want to discard current changes?',
        
        savetoserver:'Save original file (in server)',
        savetolocal:"Save jsLinb Class file(.js) to local disk",
        saveashtml:"Save a runnable file(.html) to local disk",
        saveaszip:"Save release package(.zip) to local disk",
        
        themeDft:'Default Theme',
        themeAqua:'Aqua Theme',
        themeVista:'Vista Theme',
        
        noexist:"$0 doesn't exist!"
    },
    
    menu:{
        file:'Project',
        newproject:'New Project',
        openproject:'Open Project',
        closeproject:'Close Project',
        deleteproject:'Delete Project',
        save:'Save',
        saveall:'Save All',

        tools: 'Tools',
            servicetester:"LINB Service Test",
            command:'Command Window',
            jsoneditor:'JSON Editor',
            
            cookbook:'CookBook',
            api:'API Documentation',
            codesnipt:'Code Snippet',
            backendcode:'Back-end Service Code',
                php:'PHP Code',
                csharp:'C# Code',
                java:'JAVA Code',
            spy:'Components Spy',

        build: 'Build',
        debug: 'Run Application',
        release: 'Download package',
        setting: 'Build Setting',

        help: 'Help',
        simple: 'Simple Version',
        video:'Introduction Video',
        forum: 'Go to Forum...',
        license:'License',
        gpllicense:'LGPL License',
        clicense: 'Commercial License',
        purchase:'Purchase License',
        about: 'About...'
    },
    tool:{
        newp:'Create a New Project',
        open:'Open a Existing Project',
        save:'Save Files',
        saveall:'Save All Changed Files',
        command:'Open Command Window',
        spy:'Open Widget Spy Window',
        debug:'Run the Current Project',
        release:'Package and download the Current Project',
        ec:'Translate Language',
        manual:'Visual Builder Manual...',
        api:'Components API Reference...',              
        demo:'Samples',
        flash:'Flash Video Show'
    },
    tool2:{
        'new':'Add files',
        del: 'Delete Files',
        refresh:'Refresh Project Files',
        refreshOK:'Project Refreshed!'
    },

    pm:{
        title:'Project Manager',
        html:'HTML files',
        js:'Class files'
    },
    ps:{
        noselected:'Please Select a Project First',
        noprj:'No Project Open',
        getting:'Getting Project List...',
        saved:'$0 File(s) Saved',
        noSaved:'No Files Modified Since Last Saving'
    },
    projectPro:{
        type:"Template type:",
        template:"Template list:",
        name:"Project Name :",
        'class':"Class Name :",
        pagefile:"Page File :",
        classfile:"Class File :",
        onlyword:'Words(3-15) Allowed Only',
        invalid :'Some Fileds Invalid!'
    },
    dialog:{
        newone:'Create a New Project...',
        select:'Select a Project to Open'
    },
    JSEditor:{
        sv:'Code',
        dv:'Design View',
        svtips:'Code Editor',
        dvtips:'Visual IDE for Design UI Widgets',
        codeerr:'Can\'t Parse Code Due to Error: $0!',
        specifytype:"Specify type",
        clickapi:"API window"
    },
    pageEditor:{
        check:"Syntax Check",
        'reset':"Reset Code",
        checktips:"Check Code",
        resettips:"Reset Code to Original Form",
        formatted:'Formatted Code',
        outline:'Class Outline',
        'search':'Search',
        'replace':'Replace',
        searchreplace:'Find and Replace',
        replacesearch:'Replace / Find',
        replacewith:'Replace',
        replaceall:'Replace All',
        findnone:'No Result',
        replaceCount:'$0 matched replaced',
        jumpto:'Jump to line',
        indentall:"Re-indent",
        outlinetips:'Class Outline',
        'searchtips':'Search',
        'replacetips':'Replace',
        jumptotips:'Jump to line',
        indentalltips:"Re-indent"
    },
    classtool:{
        err1:'Invalid Code Format, Please Go Back to Have a Check!',
        err2:'Invalid Code Format, Please Go Back to Have a Check!',
        err3:'Invalid Code Format, Please Go Back to Have a Check!',
        err4:'Invalid Code Format, Please Go Back to Have a Check!',
        noClass:'Not a single jsLinb Class File!'
    },
    designer:{
        toolsbox:'Tools Box',
        configwnd:'Component config',
        
        emptyContent:'Empty Content First...',
        prepare:'Prepare Classes...',
        createContent:'Refresh design content...',
        loading:'Loading ',
        comCodeErr:'An Error Occurs in Function "iniComponents", Please Go Back to Check the Code',
        nameExists:'A Widget Named "$0" Exists Already!',
        domIdExists:'A DOM node wich id "$0" exists already!',
        domIdValid:'DOM id must be char and number only',
        confirmdel:'Delete?',
        confirmdel2:"Are You Sure to Delete the $0 Selected  Component(s)?",
        confirmrefresh1: "Refresh Design View from Code",
        confirmrefresh2: "UI has been changed, 'refresh' will result in loss of these changes, whether to refresh?",
        refreshOK:'Refreshed!',
        wlist: 'Widgets List',
        weditor:'Widget Editor',
        gridcol1: 'property',
        gridcol2: 'value',
        colneOK:'$0 Widgets Cloned',
        openwidgets:'Expend/Fold the widgtes list',
        dragwidget:'You can drag this widget to the design window!',
        openapi:'DblClick to open API window',
        tool:{
            viewsize:"View Size",
            refresh:"Refresh the Design View",
            tocode:"Serialize selection to JS code",
            tojson:"Serialize selection to JSON code",
            left: 'Align to left',
            center:'Align to center',
            right:'Align to right',
            top:'Align to top',
            middle:'Align to middle',
            bottom:'Align to botttom',
            width:'Same width',
            wh:'Same width and height',
            height:'Same height',
            toplayer: 'To top layer',
            bottomlayer: 'To bottom layer',
            gridxy: 'Set position to grid',
            gridwh: 'Set size to grid',
            clone:'Clone selected controls',
            'delete': 'Delete',
            aligngroup : 'Align',
            posgroup : 'Grid&Layer'
        }
    },
    addfile:{
        caption:'Add file to Project...',
        sel:'Select the target Folder',
        filename:'File Name',
        filenameformat:'2 - 9 characters only',
        add:'Add',
        'iDir':'Folder',
        'iHtml':'New HTML file',
        'iCSS':'New CSS file',
        'iJs':'New JS file',
        'iPhp':'New PHP file',
        'iUpload':'Upload a file',
        'target':'Target',
        filetype:'File Type',
        notarget:'File or Directory to be built does NOT exist',
        invalidExts: 'The file type is not allowed',
        invalidName: 'Only numbers and letters allowed'
    },
    delfile:{
        caption:'Delete Files From Project...',
        sel:'Select target files or folders',
        notarget:'Target files or folders does NOT exist',
        confirmdel:'Delete?',
        confirmdel2:"Are You Sure to Delete the $0 Selected  Files or Folders?",
        confirmdel3:"Are You Sure to Delete the current project?"
    }
}
