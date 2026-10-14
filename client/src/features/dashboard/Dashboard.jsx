import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../api/dashboardService.js';
import { useTranslationStore } from '../i18n/i18nStore.js';
import SolarPerformanceChart from './SolarPerformanceChart.jsx';
import SlotUtilisationChart from './SlotUtilisationChart.jsx';
import BatterySOCTrend from './BatterySOCTrend.jsx';
import ApplianceUtilisationChart from './ApplianceUtilisationChart.jsx';
import SizeBandCookingTime from './SizeBandCookingTime.jsx';
import ExpectedVsActualSolar from './ExpectedVsActualSolar.jsx';
import SatisfactionTrend from './SatisfactionTrend.jsx';
import FaultUptimeTrend from './FaultUptimeTrend.jsx';
import './Dashboard.css';

export default function Dashboard() {
  const { t } = useTranslationStore();

  const { data: sessionsData, isLoading: loadingSessions } = useQuery({
    queryKey: ['dashboard', 'sessions'],
    queryFn: () => dashboardService.getSessions(),
  });

  const { data: solarData, isLoading: loadingSolar } = useQuery({
    queryKey: ['dashboard', 'solar'],
    queryFn: () => dashboardService.getSolar(),
  });

  const { data: utilData, isLoading: loadingUtil } = useQuery({
    queryKey: ['dashboard', 'utilisation'],
    queryFn: () => dashboardService.getUtilisation(),
  });

  const { data: householdsData, isLoading: loadingHouseholds } = useQuery({
    queryKey: ['dashboard', 'households'],
    queryFn: () => dashboardService.getHouseholds(),
  });

  const { data: techData, isLoading: loadingTech } = useQuery({
    queryKey: ['dashboard', 'technical'],
    queryFn: () => dashboardService.getTechnical(),
  });

  const { data: feedbackData, isLoading: loadingFeedback } = useQuery({
    queryKey: ['dashboard', 'feedback'],
    queryFn: () => dashboardService.getFeedback(),
  });

  // Calculate high level KPIs
  const totalSessions = sessionsData?.length || 0;
  const totalPersonsCookedFor = sessionsData?.reduce((acc, curr) => acc + (curr.persons_cooked_for || 0), 0) || 0;
  
  const avgDurationMins = totalSessions > 0 
    ? Math.round(sessionsData.reduce((acc, curr) => acc + parseFloat(curr.duration_min || 45), 0) / totalSessions)
    : 0;

  const completedSessions = sessionsData?.filter(s => s.cooking_completed).length || 0;
  const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  const totalHouseholds = householdsData?.length || 0;
  const activeHouseholds = householdsData?.filter(h => parseInt(h.sessions_attended || 0, 10) > 0).length || 0;
  const participationRate = totalHouseholds > 0 ? Math.round((activeHouseholds / totalHouseholds) * 100) : 0;

  const totalWastedEnergy = solarData?.reduce((acc, curr) => acc + parseFloat(curr.wasted_kwh || 0), 0) || 0;
  
  const totalFaults = techData?.reduce((acc, curr) => acc + parseInt(curr.fault_count || 0, 10), 0) || 0;
  const safetyIncidents = techData?.filter(d => d.safety_incident).length || 0;

  return (
    <div className="dashboard-root">
      <div className="dashboard-header">
        <h1>{t('overviewDashboard')}</h1>
        <p>{t('monitorKitchen')}</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">{t('activeTotalHouseholds')}</div>
          <div className="kpi-value">{loadingHouseholds ? '...' : `${activeHouseholds} / ${totalHouseholds}`}</div>
          <div className="kpi-subtitle">{t('participation')}: {participationRate}%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">{t('totalSessionsCompletion')}</div>
          <div className="kpi-value">{loadingSessions ? '...' : totalSessions}</div>
          <div className="kpi-subtitle">{t('completion')}: {completionRate}%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">{t('peopleServed')}</div>
          <div className="kpi-value">{loadingSessions ? '...' : totalPersonsCookedFor}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">{t('avgSessionTime')}</div>
          <div className="kpi-value">{loadingSessions ? '...' : `${avgDurationMins} min`}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">{t('totalWastedEnergy')}</div>
          <div className="kpi-value">{loadingSolar ? '...' : `${totalWastedEnergy.toFixed(1)} kWh`}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">{t('faultsSafetyIncidents')}</div>
          <div className="kpi-value">{loadingTech ? '...' : `${totalFaults} / ${safetyIncidents}`}</div>
          <div className="kpi-subtitle">{t('operationalMetrics')}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          {loadingSolar ? <div className="chart-loading">Loading solar data...</div> : <SolarPerformanceChart data={solarData} />}
        </div>
        <div className="chart-card">
          {loadingTech ? <div className="chart-loading">Loading battery data...</div> : <BatterySOCTrend data={techData} />}
        </div>
        <div className="chart-card">
          {loadingUtil ? <div className="chart-loading">Loading utilisation data...</div> : <SlotUtilisationChart data={utilData} />}
        </div>
        <div className="chart-card">
          {loadingSessions ? <div className="chart-loading">Loading appliance data...</div> : <ApplianceUtilisationChart data={sessionsData} />}
        </div>
        <div className="chart-card">
          {loadingSessions ? <div className="chart-loading">Loading size band data...</div> : <SizeBandCookingTime data={sessionsData} />}
        </div>
        <div className="chart-card">
          {loadingSolar ? <div className="chart-loading">Loading solar metrics...</div> : <ExpectedVsActualSolar data={solarData} />}
        </div>
        <div className="chart-card">
          {loadingTech ? <div className="chart-loading">Loading technical metrics...</div> : <FaultUptimeTrend data={techData} />}
        </div>
        <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
          {loadingFeedback ? <div className="chart-loading">Loading feedback data...</div> : <SatisfactionTrend data={feedbackData} />}
        </div>
      </div>
    </div>
  );
}
