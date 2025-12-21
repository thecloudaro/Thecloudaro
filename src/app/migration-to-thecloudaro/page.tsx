import MigrateHero from "@/components/Migrate/MigrateHero";
import HowToGet from "@/components/Migrate/HowToGet";
import WhatYouNeed from "@/components/Migration/WhatYouNeed";
import ChooseYourHosting from "@/components/Migration/ChooseYourHosting";
// import NotSure from "@/components/Migration/NotSure";
import GetMore from "@/components/Migration/GetMore";
import FAQMigration from "@/components/Migration/FAQMigration";

const MigrationToTheCloudaroPage = () => {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: 'rgb(var(--migration-page-bg))' }}>
      <MigrateHero />
      <HowToGet />
      <WhatYouNeed />
      <ChooseYourHosting />
      {/* <NotSure /> */}
      <GetMore/>
      <FAQMigration/>
      

    </div>
  );
};

export default MigrationToTheCloudaroPage;

