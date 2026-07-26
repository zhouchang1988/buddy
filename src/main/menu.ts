import { Menu, BrowserWindow, app } from 'electron'

type Language = 'zh-CN' | 'zh-TW' | 'en' | 'ja' | 'ko' | 'fr' | 'es'

const menuLabels = {
  'en': {
    about: 'About Buddy',
    preferences: 'Preferences...',
    checkForUpdates: 'Check for Updates...',
    services: 'Services',
    hide: 'Hide Buddy',
    hideOthers: 'Hide Others',
    showAll: 'Show All',
    quit: 'Quit Buddy',
    file: 'File',
    newTask: 'New Task',
    closeWindow: 'Close Window',
    edit: 'Edit',
    undo: 'Undo',
    redo: 'Redo',
    cut: 'Cut',
    copy: 'Copy',
    paste: 'Paste',
    selectAll: 'Select All',
    view: 'View',
    prevTask: 'Previous Task',
    nextTask: 'Next Task',
    toggleSidebar: 'Toggle Sidebar',
    toggleStatusBar: 'Toggle Status Bar',
    reload: 'Reload',
    forceReload: 'Force Reload',
    devTools: 'Developer Tools',
    actualSize: 'Actual Size',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    fullscreen: 'Fullscreen',
    window: 'Window',
    minimize: 'Minimize',
    zoom: 'Zoom',
    bringAllFront: 'Bring All to Front',
    close: 'Close',
    help: 'Help',
    documentation: 'Buddy Documentation',
    whatsNew: "What's New?",
    sendFeedback: 'Send Feedback',
    keyboardShortcuts: 'Keyboard Shortcuts'
  },
  'zh-CN': {
    about: '关于 Buddy',
    preferences: '偏好设置...',
    checkForUpdates: '检查更新...',
    services: '服务',
    hide: '隐藏 Buddy',
    hideOthers: '隐藏其他',
    showAll: '显示全部',
    quit: '退出 Buddy',
    file: '文件',
    newTask: '新建任务',
    closeWindow: '关闭窗口',
    edit: '编辑',
    undo: '撤销',
    redo: '重做',
    cut: '剪切',
    copy: '复制',
    paste: '粘贴',
    selectAll: '全选',
    view: '视图',
    prevTask: '上一个任务',
    nextTask: '下一个任务',
    toggleSidebar: '切换侧边栏',
    toggleStatusBar: '切换状态栏',
    reload: '重新加载',
    forceReload: '强制重新加载',
    devTools: '开发者工具',
    actualSize: '实际大小',
    zoomIn: '放大',
    zoomOut: '缩小',
    fullscreen: '全屏',
    window: '窗口',
    minimize: '最小化',
    zoom: '缩放',
    bringAllFront: '前置全部窗口',
    close: '关闭',
    help: '帮助',
    documentation: 'Buddy 文档',
    whatsNew: '新功能',
    sendFeedback: '发送反馈',
    keyboardShortcuts: '键盘快捷键'
  },
  'zh-TW': {
    about: '關於 Buddy',
    preferences: '偏好設定...',
    checkForUpdates: '檢查更新…',
    services: '服務',
    hide: '隱藏 Buddy',
    hideOthers: '隱藏其他',
    showAll: '顯示全部',
    quit: '結束 Buddy',
    file: '檔案',
    newTask: '新增任務',
    closeWindow: '關閉視窗',
    edit: '編輯',
    undo: '還原',
    redo: '重做',
    cut: '剪下',
    copy: '拷貝',
    paste: '貼上',
    selectAll: '全選',
    view: '檢視',
    prevTask: '上一個任務',
    nextTask: '下一個任務',
    toggleSidebar: '切換側邊欄',
    toggleStatusBar: '切換狀態列',
    reload: '重新載入',
    forceReload: '強制重新載入',
    devTools: '開發者工具',
    actualSize: '實際大小',
    zoomIn: '放大',
    zoomOut: '縮小',
    fullscreen: '全螢幕',
    window: '視窗',
    minimize: '最小化',
    zoom: '縮放',
    bringAllFront: '將全部移至最前',
    close: '關閉',
    help: '說明',
    documentation: 'Buddy 文件',
    whatsNew: '新功能',
    sendFeedback: '傳送意見回饋',
    keyboardShortcuts: '鍵盤快速鍵'
  },
  'ja': {
    about: 'Buddy について',
    preferences: '環境設定...',
    checkForUpdates: 'アップデートを確認...',
    services: 'サービス',
    hide: 'Buddy を隠す',
    hideOthers: 'ほかを隠す',
    showAll: 'すべて表示',
    quit: 'Buddy を終了',
    file: 'ファイル',
    newTask: '新規タスク',
    closeWindow: 'ウインドウを閉じる',
    edit: '編集',
    undo: '取り消す',
    redo: 'やり直す',
    cut: 'カット',
    copy: 'コピー',
    paste: 'ペースト',
    selectAll: 'すべて選択',
    view: '表示',
    prevTask: '前のタスク',
    nextTask: '次のタスク',
    toggleSidebar: 'サイドバー切り替え',
    toggleStatusBar: 'ステータスバー切り替え',
    reload: '再読み込み',
    forceReload: '強制再読み込み',
    devTools: '開発者ツール',
    actualSize: '実際のサイズ',
    zoomIn: '拡大',
    zoomOut: '縮小',
    fullscreen: 'フルスクリーン',
    window: 'ウインドウ',
    minimize: '最小化',
    zoom: 'ズーム',
    bringAllFront: 'すべてを前面に',
    close: '閉じる',
    help: 'ヘルプ',
    documentation: 'Buddy ドキュメント',
    whatsNew: '新機能',
    sendFeedback: 'フィードバックを送信',
    keyboardShortcuts: 'キーボードショートカット'
  },
  'ko': {
    about: 'Buddy 정보',
    preferences: '환경 설정...',
    checkForUpdates: '업데이트 확인...',
    services: '서비스',
    hide: 'Buddy 가리기',
    hideOthers: '기타 가리기',
    showAll: '모두 보기',
    quit: 'Buddy 종료',
    file: '파일',
    newTask: '새 작업',
    closeWindow: '창 닫기',
    edit: '편집',
    undo: '실행 취소',
    redo: '다시 실행',
    cut: '오려두기',
    copy: '복사',
    paste: '붙여넣기',
    selectAll: '모두 선택',
    view: '보기',
    prevTask: '이전 작업',
    nextTask: '다음 작업',
    toggleSidebar: '사이드바 전환',
    toggleStatusBar: '상태 표시줄 전환',
    reload: '다시 로드',
    forceReload: '강제 다시 로드',
    devTools: '개발자 도구',
    actualSize: '실제 크기',
    zoomIn: '확대',
    zoomOut: '축소',
    fullscreen: '전체 화면',
    window: '윈도우',
    minimize: '최소화',
    zoom: '확대/축소',
    bringAllFront: '모두 앞으로 가져오기',
    close: '닫기',
    help: '도움말',
    documentation: 'Buddy 문서',
    whatsNew: '새로운 기능',
    sendFeedback: '피드백 보내기',
    keyboardShortcuts: '키보드 단축키'
  },
  'fr': {
    about: 'À propos de Buddy',
    preferences: 'Préférences...',
    checkForUpdates: 'Rechercher des mises à jour...',
    services: 'Services',
    hide: 'Masquer Buddy',
    hideOthers: 'Masquer les autres',
    showAll: 'Tout afficher',
    quit: 'Quitter Buddy',
    file: 'Fichier',
    newTask: 'Nouvelle tâche',
    closeWindow: 'Fermer la fenêtre',
    edit: 'Édition',
    undo: 'Annuler',
    redo: 'Rétablir',
    cut: 'Couper',
    copy: 'Copier',
    paste: 'Coller',
    selectAll: 'Tout sélectionner',
    view: 'Présentation',
    prevTask: 'Tâche précédente',
    nextTask: 'Tâche suivante',
    toggleSidebar: 'Basculer la barre latérale',
    toggleStatusBar: 'Basculer la barre d\'état',
    reload: 'Recharger',
    forceReload: 'Forcer le rechargement',
    devTools: 'Outils de développement',
    actualSize: 'Taille réelle',
    zoomIn: 'Zoom avant',
    zoomOut: 'Zoom arrière',
    fullscreen: 'Plein écran',
    window: 'Fenêtre',
    minimize: 'Réduire',
    zoom: 'Zoom',
    bringAllFront: 'Tout ramener au premier plan',
    close: 'Fermer',
    help: 'Aide',
    documentation: 'Documentation Buddy',
    whatsNew: 'Nouveautés',
    sendFeedback: 'Envoyer des commentaires',
    keyboardShortcuts: 'Raccourcis clavier'
  },
  'es': {
    about: 'Acerca de Buddy',
    preferences: 'Preferencias...',
    checkForUpdates: 'Buscar actualizaciones...',
    services: 'Servicios',
    hide: 'Ocultar Buddy',
    hideOthers: 'Ocultar otros',
    showAll: 'Mostrar todo',
    quit: 'Salir de Buddy',
    file: 'Archivo',
    newTask: 'Nueva tarea',
    closeWindow: 'Cerrar ventana',
    edit: 'Edición',
    undo: 'Deshacer',
    redo: 'Rehacer',
    cut: 'Cortar',
    copy: 'Copiar',
    paste: 'Pegar',
    selectAll: 'Seleccionar todo',
    view: 'Visualización',
    prevTask: 'Tarea anterior',
    nextTask: 'Tarea siguiente',
    toggleSidebar: 'Alternar barra lateral',
    toggleStatusBar: 'Alternar barra de estado',
    reload: 'Recargar',
    forceReload: 'Forzar recarga',
    devTools: 'Herramientas de desarrollo',
    actualSize: 'Tamaño real',
    zoomIn: 'Ampliar',
    zoomOut: 'Reducir',
    fullscreen: 'Pantalla completa',
    window: 'Ventana',
    minimize: 'Minimizar',
    zoom: 'Zoom',
    bringAllFront: 'Traer todo al frente',
    close: 'Cerrar',
    help: 'Ayuda',
    documentation: 'Documentación de Buddy',
    whatsNew: 'Novedades',
    sendFeedback: 'Enviar comentarios',
    keyboardShortcuts: 'Atajos de teclado'
  }
} as const

let currentLang: Language = 'zh-CN'
let cachedMainWindow: BrowserWindow | null = null

function getLabels() {
  return menuLabels[currentLang] ?? menuLabels['en']
}

function buildMenu(): Menu {
  const t = getLabels()
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: app.name,
      submenu: [
        { role: 'about', label: t.about },
        { type: 'separator' },
        {
          label: t.preferences,
          accelerator: 'CmdOrCtrl+,',
          click: () => sendMenuAction('openSettings')
        },
        { type: 'separator' },
        {
          label: t.checkForUpdates,
          click: () => sendMenuAction('checkForUpdates')
        },
        { type: 'separator' },
        { role: 'services', label: t.services },
        { type: 'separator' },
        { role: 'hide', label: t.hide },
        { role: 'hideOthers', label: t.hideOthers },
        { role: 'unhide', label: t.showAll },
        { type: 'separator' },
        { role: 'quit', label: t.quit }
      ]
    },
    {
      label: t.file,
      submenu: [
        {
          label: t.newTask,
          accelerator: 'CmdOrCtrl+N',
          click: () => sendMenuAction('newTask')
        },
        { type: 'separator' },
        { role: 'close', label: t.closeWindow }
      ]
    },
    {
      label: t.edit,
      submenu: [
        { role: 'undo', label: t.undo },
        { role: 'redo', label: t.redo },
        { type: 'separator' },
        { role: 'cut', label: t.cut },
        { role: 'copy', label: t.copy },
        { role: 'paste', label: t.paste },
        { role: 'selectAll', label: t.selectAll }
      ]
    },
    {
      label: t.view,
      submenu: [
        {
          label: t.prevTask,
          accelerator: 'CmdOrCtrl+Shift+[',
          click: () => sendMenuAction('prevTask')
        },
        {
          label: t.nextTask,
          accelerator: 'CmdOrCtrl+Shift+]',
          click: () => sendMenuAction('nextTask')
        },
        { type: 'separator' },
        {
          label: t.toggleSidebar,
          accelerator: 'CmdOrCtrl+B',
          click: () => sendMenuAction('toggleSidebar')
        },
        {
          label: t.toggleStatusBar,
          accelerator: 'CmdOrCtrl+Alt+B',
          click: () => sendMenuAction('toggleStatusBar')
        },
        { type: 'separator' },
        { role: 'reload', label: t.reload },
        { role: 'forceReload', label: t.forceReload },
        { role: 'toggleDevTools', label: t.devTools },
        { type: 'separator' },
        { role: 'resetZoom', label: t.actualSize },
        { role: 'zoomIn', label: t.zoomIn },
        { role: 'zoomOut', label: t.zoomOut },
        { type: 'separator' },
        { role: 'togglefullscreen', label: t.fullscreen }
      ]
    },
    {
      label: t.window,
      submenu: [
        { role: 'minimize', label: t.minimize },
        { role: 'zoom', label: t.zoom },
        { type: 'separator' },
        { role: 'front', label: t.bringAllFront },
        { role: 'close', label: t.close }
      ]
    },
    {
      label: t.help,
      role: 'help',
      submenu: [
        {
          label: t.documentation,
          enabled: false
        },
        {
          label: t.whatsNew,
          enabled: false
        },
        {
          label: t.sendFeedback,
          enabled: false
        },
        { type: 'separator' },
        {
          label: t.keyboardShortcuts,
          accelerator: 'CmdOrCtrl+/',
          click: () => sendMenuAction('showKeyboardShortcuts')
        }
      ]
    }
  ]

  return Menu.buildFromTemplate(template)
}

function sendMenuAction(action: string): void {
  if (cachedMainWindow && !cachedMainWindow.isDestroyed()) {
    cachedMainWindow.webContents.send('menu:action', action)
  }
}

export function setupMenu(mainWindow: BrowserWindow): void {
  cachedMainWindow = mainWindow
  const menu = buildMenu()
  Menu.setApplicationMenu(menu)
}

export function updateMenuLanguage(lang: string): void {
  if (lang !== 'zh-CN' && lang !== 'zh-TW' && lang !== 'en' && lang !== 'ja' && lang !== 'ko' && lang !== 'fr' && lang !== 'es') return
  if (lang === currentLang) return
  currentLang = lang
  const menu = buildMenu()
  Menu.setApplicationMenu(menu)
}
