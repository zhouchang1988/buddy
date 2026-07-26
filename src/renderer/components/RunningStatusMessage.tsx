import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, PanelBottomOpen } from 'lucide-react'
import { ACTOR_LABEL_KEY } from '../lib/format'
import { useLanguage, useT } from '../hooks/useI18n'
import type { Language } from '../lib/i18n'
import type { ActorStreamLine } from '../hooks/useBuddy'

const HINTS_ZH_CN = [
  '解析中', '推理中', '计划中', '执行中', '检索中', '生成中', '校验中', '重构中', '合并中', '收束中',
  '捣鼓中', '整活中', '摸鱼式忙碌 ing', '花里胡哨 ing', '那啥处理 ing', '重新理顺 ing', '脑内翻炒 ing',
  '慢悠悠推进 ing', '小火慢炖 ing', '神秘运转 ing', '开搞 ing', '憋大招 ing', '疯狂脑补 ing',
  '代码蒸煮 ing', '努力圆回来 ing', 'CPU 干烧 ing', '正在玄学优化', '这就安排', '问题不大 ing', '马上就有了 ing',
  '运功 ing', '闭关 ing', '参悟 ing', '推演功法 ing', '炼丹 ing', '淬体 ing', '御剑检索 ing',
  '渡劫重构 ing', '破境生成 ing', '正在收功',
  '正在备料', '正在翻炒', '正在小火慢炖', '正在调味', '正在腌制', '正在醒面', '正在烘焙', '正在收汁', '正在装盘', '正在出锅',
  '神经脉冲 ing', '量子扰动 ing', '向量穿梭 ing', '矩阵重排 ing', '正在挥霍 token', '模型共振 ing', '意识加载 ing', '稀里糊涂 ing',
  '掀桌子了', '弄乱了', '改花了', '完蛋了', '跑路了', '舞剑中', '耍大刀呢',
  '鼓捣猫呢', '倒腾狗呢', '琢磨甩锅呢', '推卸责任呢', '想着怎么赖对方呢',
]

const HINTS_ZH_TW = [
  '解析中', '推理中', '規劃中', '執行中', '檢索中', '生成中', '校驗中', '重構中', '合併中', '收束中',
  '搗鼓中', '整活中', '摸魚式忙碌 ing', '花裡胡哨 ing', '那啥處理 ing', '重新理順 ing', '腦內翻炒 ing',
  '慢悠悠推進 ing', '小火慢燉 ing', '神祕運轉 ing', '開搞 ing', '憋大招 ing', '瘋狂腦補 ing',
  '程式蒸煮 ing', '努力圓回來 ing', 'CPU 乾燒 ing', '正在玄學優化', '這就安排', '問題不大 ing', '馬上就有 ing',
  '運功 ing', '閉關 ing', '參悟 ing', '推演功法 ing', '煉丹 ing', '淬體 ing', '御劍檢索 ing',
  '渡劫重構 ing', '破境生成 ing', '正在收功',
  '正在備料', '正在翻炒', '正在小火慢燉', '正在調味', '正在醃漬', '正在醒麵', '正在烘焙', '正在收汁', '正在裝盤', '正在出鍋',
  '神經脈衝 ing', '量子擾動 ing', '向量穿梭 ing', '矩陣重排 ing', '正在揮霍 token', '模型共振 ing', '意識載入 ing', '稀裡糊塗 ing',
  '掀桌子了', '弄亂了', '改花了', '完蛋了', '跑路了', '舞劍中', '耍大刀呢',
  '搗鼓貓呢', '倒騰狗呢', '琢磨甩鍋呢', '推卸責任呢', '想著怎麼賴對方呢',
]

const HINTS_EN = [
  'Parsing', 'Thinking', 'Planning', 'Executing', 'Searching', 'Generating', 'Validating', 'Refactoring', 'Merging', 'Wrapping up',
  'Tinkering', 'Improvising', 'Pretending to be busy', 'Adding flair', 'Doing the thing', 'Sorting it out', 'Cooking ideas',
  'Pondering slowly', 'Simmering on low', 'Mysteriously working', 'Getting started', 'Charging up', 'Hallucinating responsibly',
  'Stewing the code', 'Squaring the circle', 'CPU on fire', 'Trying mystic tweaks', 'On it', 'Should be fine', 'Almost there',
  'Channeling energy', 'In meditation', 'Studying scripture', 'Practicing form', 'Brewing elixir', 'Tempering body', 'Sword-flying through search',
  'Surviving tribulation refactor', 'Breaking through generation', 'Closing the form',
  'Prepping ingredients', 'Stir-frying', 'Slow simmering', 'Seasoning', 'Marinating', 'Resting the dough', 'Baking', 'Reducing sauce', 'Plating', 'Out of the wok',
  'Neural pulses', 'Quantum jitter', 'Vector hopping', 'Matrix shuffling', 'Burning tokens', 'Model resonance', 'Loading consciousness', 'Slightly confused',
  'Flipped the table', 'Made a mess', 'Painted it weird', "It's over", 'Ran away', 'Sword dance', 'Brandishing blades',
  'Petting the cat', 'Wrangling the dog', 'Plotting blame', 'Dodging responsibility', 'Drafting an excuse',
]

const HINTS_JA = [
  '解析中', '思考中', '計画中', '実行中', '検索中', '生成中', '検証中', 'リファクタ中', 'マージ中', 'まとめ中',
  '細工中', '即興中', '忙しいふり', '盛り付け中', '例のアレ処理中', '整理し直し中', '頭の中で調理中',
  'ゆっくり前進中', '弱火で煮込み中', '謎の稼働中', '開始中', '充電中', '妄想生成中',
  'コード蒸煮中', 'なんとか辻褄合わせ中', 'CPU 空回し中', 'オカルト最適化中', 'すぐやります', 'たぶん大丈夫', 'もうすぐ出ます',
  '気功中', '瞑想中', '経典読解中', '型の練習中', '丹薬精製中', '体を鍛え中', '御剣検索中',
  'リファクタの劫を渡り中', '生成の壁を突破中', '型を納め中',
  '仕込み中', '炒め中', '弱火でコトコト', '味付け中', '漬け込み中', '生地を寝かせ中', '焼成中', 'ソースを煮詰め中', '盛り付け中', '鍋から出荷',
  '神経パルス中', '量子ゆらぎ中', 'ベクトル移動中', '行列シャッフル中', 'トークン浪費中', 'モデル共振中', '意識ロード中', 'ちょっと混乱中',
  'ちゃぶ台返し', '散らかした', '変な色にした', '終わった', '逃げた', '剣舞中', '大刀振り回し中',
  '猫を撫で中', '犬の世話中', '責任転嫁を画策中', '責任回避中', '言い訳を起草中',
]

const HINTS_KO = [
  '분석 중', '추론 중', '계획 중', '실행 중', '검색 중', '생성 중', '검증 중', '리팩터링 중', '병합 중', '마무리 중',
  '만지작거리는 중', '즉흥 연주 중', '바쁜 척하는 중', '치장하는 중', '그거 처리하는 중', '다시 정리하는 중', '머릿속으로 볶는 중',
  '느긋하게 진행 중', '약불로 끓이는 중', '신비롭게 작동 중', '착수 중', '충전 중', '망상 생성 중',
  '코드 찌는 중', '억지로 맞추는 중', 'CPU 공회전 중', '점술 최적화 중', '바로 합니다', '괜찮을 겁니다', '곧 나옵니다',
  '기공 중', '명상 중', '경전 공부 중', '동작 연습 중', '단약 제조 중', '단련 중', '검 타고 검색 중',
  '리팩터링 겁난 극복 중', '생성의 벽 돌파 중', '마무리 동작 중',
  '재료 준비 중', '볶는 중', '약불 조림 중', '간 맞추는 중', '재우는 중', '반죽 숙성 중', '굽는 중', '소스 졸이는 중', '플레이팅 중', '냄비에서 출하',
  '신경 펄스 중', '양자 요동 중', '벡터 이동 중', '행렬 셔플 중', '토큰 탕진 중', '모델 공명 중', '의식 로딩 중', '살짝 혼란 중',
  '상 엎었다', '어질렀다', '이상하게 칠했다', '망했다', '도망쳤다', '검무 중', '대도 휘두르는 중',
  '고양이 쓰다듬는 중', '개 돌보는 중', '책임 떠넘기기 꾸미는 중', '책임 회피 중', '핑계 초안 작성 중',
]

const HINTS_FR = [
  'Analyse', 'Réflexion', 'Planification', 'Exécution', 'Recherche', 'Génération', 'Validation', 'Refactorisation', 'Fusion', 'Finalisation',
  'Bricolage', 'Improvisation', 'Fait semblant d\'être occupé', 'Ajout de flair', 'Fait le truc', 'Remet de l\'ordre', 'Mijote des idées',
  'Réflexion lente', 'Mijotage à feu doux', 'Travail mystérieux', 'C\'est parti', 'Recharge', 'Hallucine de façon responsable',
  'Mijote le code', 'Résout l\'insoluble', 'CPU en feu', 'Tentative mystique', 'Je m\'en occupe', 'Ça devrait aller', 'Presque là',
  'Canalise l\'énergie', 'En méditation', 'Étudie les écritures', 'Pratique la forme', 'Prépare l\'élixir', 'Trempe le corps', 'Recherche à vol d\'épée',
  'Survit à la refactorisation', 'Franchit la génération', 'Clôt la forme',
  'Prépare les ingrédients', 'Sauté en cours', 'Mijotage lent', 'Assaisonnement', 'Marinade', 'Repos de la pâte', 'Cuisson', 'Réduction de la sauce', 'Dressage', 'Sortie du wok',
  'Impulsions neurales', 'Gigue quantique', 'Saut de vecteurs', 'Mélange de matrices', 'Brûle des tokens', 'Résonance du modèle', 'Chargement de la conscience', 'Légèrement confus',
  'A renversé la table', 'A tout sali', 'A peint bizarrement', 'C\'est fini', 'A fui', 'Danse de l\'épée', 'Brandit les lames',
  'Caresse le chat', 'Gère le chien', 'Prépare un coupable', 'Esquive la responsabilité', 'Rédige une excuse',
]

const HINTS_ES = [
  'Analizando', 'Razonando', 'Planificando', 'Ejecutando', 'Buscando', 'Generando', 'Validando', 'Refactorizando', 'Fusionando', 'Rematando',
  'Trasteando', 'Improvisando', 'Fingiendo estar ocupado', 'Dándole brillo', 'Haciendo eso', 'Reordenando', 'Cociendo ideas',
  'Reflexionando despacio', 'A fuego lento', 'Trabajo misterioso', 'En marcha', 'Cargando energía', 'Alucinando con responsabilidad',
  'Cociendo el código', 'Cuadrando el círculo', 'CPU en llamas', 'Ajustes místicos', 'En ello', 'Debería ir bien', 'Casi listo',
  'Canalizando energía', 'En meditación', 'Estudiando escrituras', 'Practicando la forma', 'Preparando el elixir', 'Templando el cuerpo', 'Búsqueda a vuelo de espada',
  'Sobreviviendo a la refactorización', 'Rompiendo la generación', 'Cerrando la forma',
  'Preparando ingredientes', 'Sofriendo', 'Cocción lenta', 'Sazonando', 'Marinando', 'Reposando la masa', 'Horneando', 'Reduciendo la salsa', 'Emplatando', 'Fuera del wok',
  'Pulsos neuronales', 'Temblor cuántico', 'Salto de vectores', 'Barajando matrices', 'Quemando tokens', 'Resonancia del modelo', 'Cargando conciencia', 'Ligeramente confundido',
  'Volcó la mesa', 'Lo manchó todo', 'Lo pintó raro', 'Se acabó', 'Huyó', 'Danza de la espada', 'Blandiendo espadas',
  'Acariciando al gato', 'Lidiando con el perro', 'Planeando echar la culpa', 'Esquivando responsabilidad', 'Redactando una excusa',
]

const dotsPhases = ['', '.', '..', '...']

function pickHint(lang: Language): string {
  const bank =
    lang === 'en' ? HINTS_EN
      : lang === 'zh-TW' ? HINTS_ZH_TW
        : lang === 'ja' ? HINTS_JA
          : lang === 'ko' ? HINTS_KO
            : lang === 'fr' ? HINTS_FR
              : lang === 'es' ? HINTS_ES
                : HINTS_ZH_CN
  return bank[Math.floor(Math.random() * bank.length)]
}

function formatElapsed(startedAt: string): string {
  const diff = Date.now() - new Date(startedAt).getTime()
  if (Number.isNaN(diff) || diff < 0) return ''
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return `${sec}s`
  const min = Math.floor(sec / 60)
  const remainSec = sec % 60
  if (min < 60) return `${min}m ${remainSec}s`
  const hour = Math.floor(min / 60)
  const remainMin = min % 60
  return `${hour}h ${remainMin}m`
}

function actorColorVar(actor: string): string {
  if (['claude', 'codex', 'opencode', 'kimi'].includes(actor)) return `var(--actor-${actor})`
  return 'var(--border)'
}

export function RunningStatusMessage({
  actor,
  startedAt,
  expanded,
  onToggleExpand
}: {
  actor: string
  startedAt: string
  round?: number
  expanded?: boolean
  onToggleExpand?: () => void
}) {
  const t = useT()
  const lang = useLanguage()
  const [hint, setHint] = useState(() => pickHint(lang))
  const [dots, setDots] = useState(0)
  const [elapsed, setElapsed] = useState(() => formatElapsed(startedAt))
  const tickRef = useRef(0)

  useEffect(() => {
    setHint(pickHint(lang))
  }, [lang])

  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current += 1
      setDots(prev => (prev + 1) % dotsPhases.length)
      setElapsed(formatElapsed(startedAt))
      if (tickRef.current % 10 === 0) {
        setHint(pickHint(lang))
      }
    }, 400)
    return () => clearInterval(interval)
  }, [startedAt, lang])

  const metaText = t('running.metaSuffix', { elapsed })
  const actorLabel = ACTOR_LABEL_KEY[actor] ? t(ACTOR_LABEL_KEY[actor]) : actor

  return (
    <div className="flex justify-start">
      <div className={`message w-full running-status ${expanded ? 'running-status-expanded' : 'mb-3'}`} style={{ '--actor-color': actorColorVar(actor), borderColor: actorColorVar(actor) } as React.CSSProperties}>
        <div className="message-head">
          <span className="role" style={{ color: actorColorVar(actor) }}>{actorLabel}</span>
          <div className="flex items-center gap-2">
            <span>{metaText}</span>
            {onToggleExpand && (
              <button
                type="button"
                onClick={onToggleExpand}
                className="running-expand-btn"
                title={expanded ? t('running.collapseDetail') : t('running.expandDetail')}
              >
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
          </div>
        </div>
        <div
          className="running-status-body"
          onClick={onToggleExpand}
          style={onToggleExpand ? { cursor: 'pointer' } : undefined}
        >
          {hint}{dotsPhases[dots]}
        </div>
      </div>
    </div>
  )
}

export function RunningDetailPanel({
  actor,
  streamLines,
  lastMessage,
  onCollapse
}: {
  actor: string
  streamLines: ActorStreamLine[]
  lastMessage?: string
  onCollapse?: () => void
}) {
  const t = useT()
  const scrollRef = useRef<HTMLDivElement>(null)
  const userScrolledUp = useRef(false)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  const isNearBottom = () => {
    const el = scrollRef.current
    if (!el) return true
    return el.scrollHeight - el.scrollTop - el.clientHeight < 60
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handler = () => {
      userScrolledUp.current = !isNearBottom()
    }
    el.addEventListener('scroll', handler, { passive: true })
    return () => el.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (scrollRef.current && !userScrolledUp.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [streamLines])

  return (
    <div className="running-detail-panel" style={{ '--actor-color': actorColorVar(actor) } as React.CSSProperties}>
      <div ref={scrollRef} className="running-detail-content">
        {streamLines.length === 0 ? (
          lastMessage ? (
            <div className="running-detail-line running-detail-fallback">{lastMessage}</div>
          ) : (
            <div className="running-detail-empty">{t('running.streamingWaiting')}</div>
          )
        ) : (
          streamLines.map((line, i) => (
            <div key={i} className="running-detail-line">{line.text}</div>
          ))
        )}
      </div>
      {onCollapse && (
        <div className="running-detail-footer">
          <button
            type="button"
            onClick={onCollapse}
            className="running-detail-collapse-btn"
            title={t('running.collapseDetail')}
          >
            <PanelBottomOpen size={14} />
            <span>{t('common.collapse')}</span>
          </button>
        </div>
      )}
    </div>
  )
}
