import { motion } from 'framer-motion';

// ============ ANIMATION CONFIG ============
const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1,
};

const hoverTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

const headerFade = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ...springTransition,
      delay: 0,
    },
  },
};
import {
  Users,
  BookOpen,
  Activity,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Crown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ============ SUB-COMPONENTS ============

const AnimatedCard = ({ children, className = '', delay = 0 }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{
      y: -6,
      scale: 1.02,
      transition: hoverTransition,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StatCard = ({ title, value, subtitle, icon: Icon, trend, isHero = false, children }) => (
  <AnimatedCard
    className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-shadow hover:shadow-lg ${
      isHero ? 'ring-2 ring-indigo-500/20' : ''
    }`}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className={`font-bold text-slate-900 ${isHero ? 'text-3xl' : 'text-2xl'}`}>
          {value}
        </h3>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        {trend !== undefined && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, ...springTransition }}
            className="flex items-center gap-1 mt-2"
          >
            {trend >= 0 ? (
              <>
                <TrendingUp size={16} className="text-emerald-500" />
                <span className="text-sm font-medium text-emerald-500">+{trend}%</span>
              </>
            ) : (
              <>
                <TrendingDown size={16} className="text-rose-500" />
                <span className="text-sm font-medium text-rose-500">{trend}%</span>
              </>
            )}
            <span className="text-xs text-slate-400 ml-1">vs last month</span>
          </motion.div>
        )}
      </div>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={hoverTransition}
        className={`p-3 rounded-xl ${
          isHero
            ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
            : 'bg-slate-50'
        }`}
      >
        <Icon size={24} className={isHero ? 'text-white' : 'text-slate-600'} />
      </motion.div>
    </div>
    {children}
  </AnimatedCard>
);

const ActiveReadersCard = ({ stats }) => (
  <AnimatedCard className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">Active Readers</p>
        <motion.h3
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, ...springTransition }}
          className="text-2xl font-bold text-slate-900"
        >
          {stats.activeReaders.value.toLocaleString()}
        </motion.h3>
      </div>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={hoverTransition}
        className="p-3 rounded-xl bg-emerald-50"
      >
        <Activity size={24} className="text-emerald-600" />
      </motion.div>
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex items-center gap-2"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </span>
      <span className="text-sm text-slate-500">Currently online</span>
    </motion.div>
  </AnimatedCard>
);

const BooksCard = ({ stats }) => (
  <AnimatedCard className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">Total Books</p>
        <motion.h3
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, ...springTransition }}
          className="text-2xl font-bold text-slate-900"
        >
          {stats.totalBooks.value.toLocaleString()}
        </motion.h3>
      </div>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={hoverTransition}
        className="p-3 rounded-xl bg-amber-50"
      >
        <BookOpen size={24} className="text-amber-600" />
      </motion.div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, ...springTransition }}
      className="flex gap-4"
    >
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 500, damping: 20 }}
          className="w-2 h-2 rounded-full bg-emerald-500"
        ></motion.div>
        <span className="text-sm text-slate-600">
          Active: <strong>{stats.totalBooks.active.toLocaleString()}</strong>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 500, damping: 20 }}
          className="w-2 h-2 rounded-full bg-amber-500"
        ></motion.div>
        <span className="text-sm text-slate-600">
          Pending: <strong>{stats.totalBooks.pending.toLocaleString()}</strong>
        </span>
      </div>
    </motion.div>
  </AnimatedCard>
);

const ChartCard = ({ title, children, className = '' }) => (
  <motion.div
    variants={scaleIn}
    whileHover={{
      scale: 1.01,
      transition: { duration: 0.3 },
    }}
    className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-shadow hover:shadow-md ${className}`}
  >
    <motion.h4
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={springTransition}
      className="text-lg font-semibold text-slate-800 mb-4"
    >
      {title}
    </motion.h4>
    {children}
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-slate-300">
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ConversionRate = ({ rate }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (rate / 100) * circumference;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      transition={hoverTransition}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
    >
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={springTransition}
        className="flex items-center gap-2 mb-4"
      >
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <Crown size={20} className="text-amber-500" />
        </motion.div>
        <h4 className="text-lg font-semibold text-slate-800">Conversion Rate</h4>
      </motion.div>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="40"
              stroke="#e2e8f0"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
              style={{ strokeDasharray: circumference }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, ...springTransition }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className="text-2xl font-bold text-slate-900">{rate}%</span>
            <span className="text-xs text-slate-500">Upgraded</span>
          </motion.div>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-sm text-slate-500 mt-3"
      >
        Free users who purchased Lifetime access
      </motion.p>
    </motion.div>
  );
};

const TopPerformersTable = ({ topReadBooks, topEarningBooks }) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-2"
  >
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={springTransition}
      className="flex items-center gap-2 mb-4"
    >
      <motion.div whileHover={{ scale: 1.2, rotate: 15 }} transition={hoverTransition}>
        <Eye size={20} className="text-indigo-500" />
      </motion.div>
      <h4 className="text-lg font-semibold text-slate-800">Top Performers</h4>
    </motion.div>
    <div className="grid md:grid-cols-2 gap-6">
      {/* Most Read */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <h5 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">
          Most Read Books
        </h5>
        <div className="space-y-3">
          {topReadBooks.map((book, index) => (
            <motion.div
              key={book.title}
              variants={fadeInUp}
              whileHover={{ x: 4, scale: 1.01 }}
              transition={hoverTransition}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 400 }}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                    index === 0
                      ? 'bg-amber-100 text-amber-600'
                      : index === 1
                      ? 'bg-slate-200 text-slate-600'
                      : index === 2
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {index + 1}
                </motion.span>
                <span className="text-sm font-medium text-slate-700 truncate max-w-[150px]">
                  {book.title}
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {book.reads.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Earning */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <h5 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">
          Top Earning Books
        </h5>
        <div className="space-y-3">
          {topEarningBooks.map((book, index) => (
            <motion.div
              key={book.title}
              variants={fadeInUp}
              whileHover={{ x: 4, scale: 1.01 }}
              transition={hoverTransition}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 400 }}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                    index === 0
                      ? 'bg-emerald-100 text-emerald-600'
                      : index === 1
                      ? 'bg-slate-200 text-slate-600'
                      : index === 2
                      ? 'bg-emerald-50 text-emerald-500'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {index + 1}
                </motion.span>
                <span className="text-sm font-medium text-slate-700 truncate max-w-[150px]">
                  {book.title}
                </span>
              </div>
              <span className="text-sm font-semibold text-emerald-600">
                ${book.revenue.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// ============ MAIN COMPONENT ============

const AdminDashboardView = ({ loading, data }) => {
  const {
    stats,
    userTrendData,
    genreData,
    salesData,
    topReadBooks,
    topEarningBooks,
    COLORS,
    CHART_THEME,
    conversionRate,
  } = data;

  if (loading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <motion.div
        variants={headerFade}
        initial="hidden"
        animate="show"
        className="mb-8"
      >
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springTransition}
          className="text-3xl font-bold text-slate-900"
        >
          Dashboard Overview
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, ...springTransition }}
          className="text-slate-500 mt-1"
        >
          Welcome back! Here's what's happening with BookVerse.
        </motion.p>
      </motion.div>

      {/* Section 1: Key Statistics */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total Users"
          value={stats.totalUsers.value.toLocaleString()}
          icon={Users}
          trend={stats.totalUsers.growth}
        />
        <BooksCard stats={stats} />
        <ActiveReadersCard stats={stats} />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.value.toLocaleString()}`}
          subtitle="Lifetime earnings"
          icon={DollarSign}
          isHero
        />
      </motion.div>

      {/* Section 2: Visualizations */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <ChartCard title="User Registration Trend" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userTrendData}>
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_THEME.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_THEME.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_THEME.grid} />
              <XAxis dataKey="day" stroke={CHART_THEME.text} fontSize={12} />
              <YAxis stroke={CHART_THEME.text} fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="users"
                stroke={CHART_THEME.primary}
                strokeWidth={3}
                dot={{ fill: CHART_THEME.primary, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                fillOpacity={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Popular Genres">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2 mt-4 justify-center"
          >
            {genreData.map((entry, index) => (
              <motion.div
                key={entry.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1 cursor-pointer"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs text-slate-600">{entry.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </ChartCard>

        <ChartCard title="Weekly Sales" className="lg:col-span-3">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_THEME.primary} />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_THEME.grid} vertical={false} />
              <XAxis dataKey="day" stroke={CHART_THEME.text} fontSize={12} />
              <YAxis
                stroke={CHART_THEME.text}
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                content={<CustomTooltip />}
                formatter={(value) => [`$${value}`, 'Revenue']}
              />
              <Bar
                dataKey="revenue"
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </motion.div>

      {/* Section 3: Analytics & Rankings */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <ConversionRate rate={conversionRate} />
        <TopPerformersTable topReadBooks={topReadBooks} topEarningBooks={topEarningBooks} />
      </motion.div>
    </div>
  );
};

export default AdminDashboardView;
