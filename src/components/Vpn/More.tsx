"use client";

import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const More = () => {
  const comparisonData = [
    {
      feature: "Connect",
      subFeature: "Multiple devices simultaneously",
      fastvpn: "Unlimited*",
      nordvpn: "6",
      expressvpn: "5",
      surfshark: "Unlimited"
    },
    {
      feature: "Monthly",
      subFeature: "Plan Cost",
      fastvpn: "$0.99/mo",
      nordvpn: "$12.99/mo",
      expressvpn: "$12.95/mo",
      surfshark: "$12.95/mo"
    },
    {
      feature: "1-Year",
      subFeature: "Plan Cost",
      fastvpn: "$12.00/yr ($1.00/mo)",
      nordvpn: "$59.88/yr ($4.99/mo)",
      expressvpn: "$99.84/yr ($8.32/mo)",
      surfshark: "$47.88/yr ($3.99/mo)"
    }
  ];

  const vpnServices = [
    { name: "FastVPN", isHighlighted: true },
    { name: "NordVPN", isHighlighted: false },
    { name: "ExpressVPN", isHighlighted: false },
    { name: "Surfshark", isHighlighted: false }
  ];

  return (
    <section
      className="relative w-full py-12 sm:py-16"
      style={{ backgroundColor: 'rgb(var(--vpn-section-bg))' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center space-y-6 sm:space-y-8 mb-20 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ContentHeading
              title="More protection, less expense"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-tight tracking-tight mx-auto text-white mb-5 sm:mb-6"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <ContentDescription
              text="Get top-tier protection at a price that leaves the competition behind."
              size="lg"
              className="text-white/80"
            />
          </motion.div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="overflow-x-auto"
        >
          <div className="min-w-full inline-block">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="text-left p-2 sm:p-3 text-white font-semibold text-sm sm:text-base border-b border-white/20">
                    {/* Empty cell for feature column */}
                  </th>
                  {vpnServices.map((service) => (
                    <th
                      key={service.name}
                      className={`p-2 sm:p-3 text-white font-semibold text-sm sm:text-base text-center border-b border-white/20 ${
                        service.isHighlighted
                          ? "rounded-t-lg"
                          : ""
                      }`}
                      style={service.isHighlighted ? { backgroundColor: 'rgb(var(--vpn-more-table-highlight-bg))' } : {}}
                    >
                      {service.name}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {comparisonData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {/* Feature Column */}
                    <td className={`p-2 sm:p-3 text-white ${rowIndex < comparisonData.length - 1 ? "border-b border-white/20" : ""}`}>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm sm:text-base">
                          {row.feature}
                        </span>
                        <span className="text-xs sm:text-sm text-white/70">
                          {row.subFeature}
                        </span>
                      </div>
                    </td>

                    {/* FastVPN */}
                    <td
                      className={`p-2 sm:p-3 text-white text-center text-sm sm:text-base ${rowIndex < comparisonData.length - 1 ? "border-b border-white/20" : ""} ${
                        vpnServices[0].isHighlighted
                          ? `${rowIndex === comparisonData.length - 1 ? "rounded-b-lg" : ""}`
                          : ""
                      }`}
                      style={vpnServices[0].isHighlighted ? { backgroundColor: 'rgb(var(--vpn-more-table-highlight-bg))' } : {}}
                    >
                      {row.fastvpn}
                    </td>

                    {/* NordVPN */}
                    <td
                      className={`p-2 sm:p-3 text-white text-center text-sm sm:text-base ${rowIndex < comparisonData.length - 1 ? "border-b border-white/20" : ""}`}
                    >
                      {row.nordvpn}
                    </td>

                    {/* ExpressVPN */}
                    <td
                      className={`p-2 sm:p-3 text-white text-center text-sm sm:text-base ${rowIndex < comparisonData.length - 1 ? "border-b border-white/20" : ""}`}
                    >
                      {row.expressvpn}
                    </td>

                    {/* Surfshark */}
                    <td
                      className={`p-2 sm:p-3 text-white text-center text-sm sm:text-base ${rowIndex < comparisonData.length - 1 ? "border-b border-white/20" : ""}`}
                    >
                      {row.surfshark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="mt-3 sm:mt-4 text-center"
        >
          <p className="text-white/60 text-xs sm:text-sm">
            *Unlimited connections apply to privacy servers only. Prices verified August 2025; competitors may change rates.
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="flex justify-center mt-6 sm:mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300"
            style={{
              backgroundColor: 'rgb(var(--vpn-more-button-bg))',
              color: 'rgb(var(--vpn-more-button-text))'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(var(--vpn-more-button-hover))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(var(--vpn-more-button-bg))';
            }}
          >
            Get your plan
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default More;

