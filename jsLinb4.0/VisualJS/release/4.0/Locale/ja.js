(linb.Locale.ja||(linb.Locale.ja={})).VisualJS={
    message:"システムからのメッセージ",
    noMessage:"VisuleJS Ajax/javascript UI Builder!へようこそ",
    soon:'少々お待ちください',
    ok:'OK',
    cancel:'キャンセル',
    'close':'閉じる',
    notsave:'保存しない',
    notsave2:'ファイルを保存せずに閉じようとしています。<p>[はい]をクリックすると破棄して閉じます。[いいえ]をクリックすると保存できます。',
    notsave3:'デバッグの前に修正箇所を保存していません。<p>[はい] をクリックすると保存せずにデバッグします。[いいえ]をクリックすると保存できます。',
    checkOK:'シンタックスエラーはありませんでした',
    en:'英語',
    cn:'中国語',
    ja:'日本語',
    tw:'繁体中国語',
    ru:'ロシア',
    langTips:'表示言語を切り替えます。',
    
    spabuilder: {
       nosavefirst:'ファイルを保存せずに閉じようとしています。よろしいですか?',
       menubar:{
            servicetester:'LINB サービステスター',
            backendcode:'バックエンドサービスコード',
            php:'PHP のコード',
            csharp:'C# のコード',
            java:'JAVA のコード',
            links:'リンク',
            linb:'linb.net サイト',
            gcodelist:'Googleソースコードのダウンロードリスト',
            cookbook:'ユーザーズマニュアル',
            api:'API ドキュメント',
            codesnipt:'コードスニペット',
            forum:'フォーラム',
            jsoneditor:'JSONのエディタ',
            adv:'Builderはバージョン詳細',
            commecial:'商用サポート',
            video:'紹介ビデオ',
            about:'について'
        },
        st_title:"LINB サービスのテスト",
        st_nodata:"あなたのURIまたはクエリオブジェクトをチェックする必要がある！",
        st_uri:"サービスURI",
        st_queryobj:"リクエストのクエリオブジェクト",
        st_createcode:"リクエストコードを作成します",
        st_send:"サービスにテスト要求を送信する",
        st_sending:"中...",
        st_result:"結果",
        st_format:"フォーマット",
        st_mothod:"Queryメソッド"
    },
    
    builder:{

        open:'開く',
        openTips:'ファイルを開きます。',
        save:'保存',
        saveTips:'ファイルを保存、またはダウンロードします。',
        run:'実行',
        runTips:'デバッグページでjsLinbを実行します。',
        dftTheme:'デフォルトテーマ',
        dftThemeTips:'テーマを変更します。',
        advancedBuilder:'Advanced',
        originalFile:"オリジナルファイル: ",
        issave2server:"サーバ上のオリジナルファイルを上書きしますか?",
        save2serverOK:'サーバへの保存ができました。',
        nosavefirst:'ファイルを保存せずに閉じようとしています。よろしいですか?',
        
        savetoserver:'サーバに保存する',
        savetolocal:"jsLinbクラスファイル(.js)をローカルディスクに保存",
        saveashtml:"実行可能ファイル(.html)をローカルディスクに保存",
        saveaszip:"リリースパッケージ(.zip)をローカルディスクに保存",
        
        themeDft:'デフォルトのテーマ',
        themeAqua:'Aquaテーマ',
        themeVista:'Vistaテーマ',
        
        noexist:"$0 は存在しません"
    },
    
    menu:{
        file:'プロジェクト',
        newproject:'新規プロジェクト',
        openproject:'プロジェクトを開く',
        closeproject:'プロジェクトを閉じる',
        deleteproject:'削除プロジェクト',
        save:'保存',
        saveall:'すべて保存',

        tools: 'ツール',
            servicetester:'LINB サービステスター',
            command:'コマンドウインドウ',
            jsoneditor:'JSONのエディタ',
            
            cookbook:'ユーザーズマニュアル',
            api:'API ドキュメント',
            codesnipt:'コードスニペット',
            backendcode:'バックエンドサービスコード',
                php:'PHP のコード',
                csharp:'C# のコード',
                java:'JAVA のコード',
            spy:'ウィジェットスパイ',

        build: 'ビルド',
        debug: 'アプリケーションの実行',
        release: 'パッケージのダウンロード',
        setting: 'ビルドの設定',

        help: 'ヘルプ',
        simple:'Simple Version',
        video:'紹介ビデオ',
        forum: 'フォーラムを開く',
        license:'ライセンス',
        gpllicense:'LGPLライセンス',
        clicense: '商用ライセンス',
        purchase:'ライセンスの購入',
        about: 'このアプリケーションについて'
    },
    tool:{
        newp:'新規プロジェクト',
        open:'プロジェクトを開く',
        save:'保存',
        saveall:'すべてのファイルを保存',
        command:'コマンドウインドウを開く',
        spy:'ウィジェットスパイウインドウを開く',
        debug:'現在のプロジェクトを実行',
        release:'現在のプロジェクトをパッケージ化して保存',
        ec:'言語に翻訳',
        manual:'Visual Builderマニュアル',
        api:'Components APIリファレンス',              
        demo:'サンプル',
        flash:'ビデオプレゼンテーション'
    },
    tool2:{
        'new':'プロジェクトにファイルを追加します。',
        del: '現在のファイルを削除',
        refresh:'プロジェクトファイルを更新',
        refreshOK:'プロジェクトは更新されました'
    },

    pm:{
        title:'プロジェクトマネージャ',
        html:'HTMLファイル',
        js:'Classファイル'
    },
    ps:{
        noselected:'プロジェクトを選択してください。',
        noprj:'開くプロジェクトはありません',
        getting:'プロジェクトのリストを取得中',
        saved:'$0個のファイルを保存しました。',
        noSaved:'最後に保存した状態からの変更はありませんでした。'
    },
    projectPro:{
        type:"Template type:",
        template:"Template list:",
        name:"プロジェクト名 :",
        'class':"クラス名 :",
        pagefile:"ページファイル :",
        classfile:"クラスファイル :",
        onlyword:'3〜15文字が有効です',
        invalid :'いくつかのフィールドが正しくありません'
    },
    dialog:{
        newone:'新規プロジェクトの作成...',
        select:'開くプロジェクトを選択してください'
    },
    JSEditor:{
        sv:'画面構造',
        dv:'デザイン',
        svtips:'ソースコードの構造を表示します',
        dvtips:'UIウィジェットを配置して画面設計を行います',
        codeerr:'以下のエラーにより、コードを貼り付けられません: $0!',
        specifytype:"指定されたタイプ",
        clickapi:"APIのウィンドウ"
    },
    pageEditor:{
        check:"シンタックスチェック",
        'reset':"コードのリセット",
        checktips:"コードのチェック",
        resettips:"コードをリセットします",
        formatted:'フォーマットされたコード',
        outline:'Class 概要',
        'search':'検索',
        'replace':'置換',
        searchreplace:'検索と置換',
        replacesearch:'置換 / 検索',
        replacewith:'置換',
        Replaceall:'すべて置換',
        findnone:'見つかりませんでした',
        replaceCount:'検索と $0 つの置換',
        jumpto:'の行に移動',
        indentall:"再インデント",
        outlinetips:'Class 概要',
        'searchtips':'検索',
        'replacetips':'置換',
        jumptotips:'の行に移動',
        indentalltips:"再インデント"
    },
    classtool:{
        err1:'コードにエラーがあります。前の画面に戻り確認してください。',
        err2:'コードにエラーがあります。前の画面に戻り確認してください。',
        err3:'コードにエラーがあります。前の画面に戻り確認してください。',
        err4:'コードにエラーがあります。前の画面に戻り確認してください。',
        noClass:'UIのクラスファイルではありません'
    },
    designer:{
        toolsbox:'ツールボックス',
        configwnd:'コンポーネントの設定',
        
        emptyContent:'初期化中',
        prepare:'クラスの準備中',
        createContent:'デザインの更新中',
        loading:'読み込み中',
        comCodeErr:'関数 "iniComponents" の中でエラーが発生しました。コードを確認してください。',
        nameExists:'"$0"という名前のウィジェットはすでに存在ししています。',
        domIdExists:'id "$0" のDOMノードはすでに存在しています。',
        domIdValid:'DOM idには英数字のみが使用できます。',
        confirmdel:'削除しますか?',
        confirmdel2:"選択されたウィジェット($0個)を削除してもよいですか?",
        confirmrefresh1:"リフレッシュデザインビュー",
        confirmrefresh2は:"現在のデザインのビューが変更されており、更新は更新を続行するかどうか、これらの変更が失われるのだろうか？",
        refreshOK:'更新されました',
        wlist: 'ウィジェット一覧',
        weditor:'ウィジェットエディタ',
        gridcol1: 'プロパティ',
        gridcol2: '値',
        colneOK:'ウィジェット $0 を複製しました',
        openwidgets:'ウィジェットのリストを展開したり閉じたりします',
        dragwidget:'このウィジェットをドラッグ&ドロップして画面を設計します',
        openapi:'ダブルクリックすると、APIリファレンスを表示します',
        tool:{
            viewsize:"表示画面サイズ",
            refresh:"リフレッシュデザインビュー",
            tocode:"選択内容をJavaScriptコードに整形",
            tojson:"選択内容をJSONコードに整形",
            left: '左にそろえる',
            center:'中央にそろえる',
            right:'右にそろえる',
            top:'上にそろえる',
            middle:'中央にそろえる',
            bottom:'下にそろえる',
            width:'同じ幅',
            wh:'同じ幅と高さ',
            height:'同じ高さ',
            toplayer: '上へ',
            bottomlayer: '下へ',
            gridxy: '位置をグリッドにそろえる',
            gridwh: '大きさをグリッドにそろえる',
            clone:'選択したコントロールを複製',
            'delete': '削除',
            aligngroup : 'コントロールの配置',
            posgroup : 'グリッドとレイヤー'
        }
    },
    addfile:{
        caption:'ファイルをプロジェクトに追加...',
        sel:'ターゲットフォルダの選択',
        filename:'ファイル名',
        filenameformat:'2-18文字の英数字',
        add:'追加',
        'iDir':'フォルダ',
        'iHtml':'新しいHTMLファイル',
        'iCSS':'新しいCSSファイル',
        'iJs':'新しいJSファイル',
        'iPhp':'新しいPHPファイル',
        'IUpload':'ファイルのアップロード',
        'target':'ターゲット',
        filetype:'ファイルの種類',
        notarget:'ファイルまたはディレクトリが存在しません。',
        invalidExts:'アップロードは、ファイルタイプが許可されていません',
        invalidName: 'アップロード文字または数字のみのファイル名から'
    },
    delfile:{
        caption:'プロジェクトからファイルを削除します',
        sel:'ファイルかフォルダを選択してください。',
        notarget:'ファイルまたはディレクトリが存在しません。',
        confirmdel:'削除しますか?',
        confirmdel2:"選択された $0 を削除してもよろしいですか?",
        confirmdel3:"現在のプロジェクトを削除?"
    }
}
