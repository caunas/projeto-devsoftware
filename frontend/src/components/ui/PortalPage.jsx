import ActivityPublisher from "./ActivityPublisher";
import ActivityList from "./ActivityList";
import Agenda from "./Agenda";
import CoordinatorEventCalendar from "./CoordinatorEventCalendar";
import DataTable from "./DataTable";
import EventCarousel from "./EventCarousel";
import GradeReport from "./GradeReport";
import InfoCard from "./InfoCard";
import PageHeader from "./PageHeader";
import ProfileCard from "./ProfileCard";
import ServicesSearch from "./ServicesSearch";
import StatCard from "./StatCard";
import WeeklyAgenda from "./WeeklyAgenda";

function PortalPage({ page }) {
  return (
    <section className="portal-page">
      {/* Renderizador genérico de páginas baseadas em dados de src/data/portalPages.js. */}
      <PageHeader
        badge={page.badge}
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />

      <EventCarousel events={page.events} />

      {/* Cada bloco é opcional: a página só renderiza o que existir no objeto page. */}
      {!!page.stats?.length && (
        <div className="stats-grid">
          {page.stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      )}

      <ProfileCard fields={page.profile?.fields} title={page.profile?.title} />

      <GradeReport grades={page.grades?.items} title={page.grades?.title} />

      {!!page.cards?.length && (
        <div className="cards-grid">
          {page.cards.map((card) => (
            <InfoCard key={`${card.label}-${card.title}`} {...card} />
          ))}
        </div>
      )}

      <DataTable rows={page.table?.rows} title={page.table?.title} />

      <ActivityList activities={page.activityList?.activities} title={page.activityList?.title} />

      <Agenda days={page.agenda?.days} title={page.agenda?.title} />

      <WeeklyAgenda days={page.weeklyAgenda?.days} title={page.weeklyAgenda?.title} />

      <ActivityPublisher
        initialActivities={page.activityPublisher?.activities}
        title={page.activityPublisher?.title}
      />

      <CoordinatorEventCalendar
        initialEvents={page.eventCalendar?.events}
        title={page.eventCalendar?.title}
      />

      <ServicesSearch services={page.services?.items} title={page.services?.title} />
    </section>
  );
}

export default PortalPage;
