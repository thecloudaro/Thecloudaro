"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ContentDescription from "@/components/ui/content-description";

const Policy = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("Established Legal Mechanisms");
  const [indicatorTop, setIndicatorTop] = useState<number>(0);
  const [whiteLineHeight, setWhiteLineHeight] = useState<number>(0);
  const [whiteLineTop, setWhiteLineTop] = useState<number>(0);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const sidebarItemRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const sidebarListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      // Find entries that are intersecting
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio and position, get the most visible one
        visibleEntries.sort((a, b) => {
          // Prioritize by intersection ratio
          if (Math.abs(b.intersectionRatio - a.intersectionRatio) > 0.1) {
            return b.intersectionRatio - a.intersectionRatio;
          }
          // If similar ratio, prioritize by position (top to bottom)
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
        
        const sectionId = visibleEntries[0].target.getAttribute('data-section-id');
        if (sectionId) {
          setActiveSection(sectionId);
        }
      }
    }, observerOptions);

    // Observe all sections after a delay to ensure refs are set
    const timeoutId = setTimeout(() => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) {
          observer.observe(section);
        }
      });
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      const sections = sectionRefs.current;
      Object.values(sections).forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [isLoaded]);

  // Update indicator position when active section changes
  useEffect(() => {
    const activeItem = sidebarItemRefs.current[activeSection];
    if (activeItem && sidebarListRef.current) {
      const itemTop = activeItem.offsetTop - sidebarListRef.current.offsetTop;
      setIndicatorTop(itemTop);
    }
  }, [activeSection]);

  // Calculate white line height and position based on list items
  useEffect(() => {
    if (sidebarListRef.current && isLoaded) {
      const updateWhiteLineHeight = () => {
        if (sidebarListRef.current) {
          const itemIds = [
            "Established Legal Mechanisms",
            "US Court Order or Subpoena",
            "Uniform Dispute Resolution Policy (UDRP)",
            "Non-US Court Order",
            "Law Enforcement",
            "All Other Requests",
            "Balancing Test"
          ];
          const firstItem = sidebarItemRefs.current[itemIds[0]];
          const lastItem = sidebarItemRefs.current[itemIds[itemIds.length - 1]];
          if (firstItem && lastItem && sidebarListRef.current) {
            const firstTop = firstItem.offsetTop - sidebarListRef.current.offsetTop;
            const lastTop = lastItem.offsetTop - sidebarListRef.current.offsetTop;
            const itemHeight = lastItem.offsetHeight;
            setWhiteLineTop(firstTop + (firstItem.offsetHeight / 2) - 1);
            setWhiteLineHeight(lastTop - firstTop + itemHeight);
          }
        }
      };
      
      // Wait a bit for refs to be set
      const timeoutId = setTimeout(updateWhiteLineHeight, 500);
      window.addEventListener('resize', updateWhiteLineHeight);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', updateWhiteLineHeight);
      };
    }
  }, [isLoaded]);

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  const sidebarItems = [
    { id: "Established Legal Mechanisms", label: "Established Legal Mechanisms" },
    { id: "US Court Order or Subpoena", label: "US Court Order or Subpoena" },
    { id: "Uniform Dispute Resolution Policy (UDRP)", label: "Uniform Dispute Resolution Policy (UDRP)" },
    { id: "Non-US Court Order", label: "Non-US Court Order" },
    { id: "Law Enforcement", label: "Law Enforcement" },
    { id: "All Other Requests", label: "All Other Requests" },
    { id: "Balancing Test", label: "Balancing Test" }
  ];

  return (
    <div 
      className="relative w-full min-h-screen pt-20"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16 md:gap-20 lg:gap-40">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-2 lg:pr-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Breadcrumb */}
              <div className="text-xs" style={{ color: 'rgb(156 163 175)' }}>
                <Link href="/legal" className="hover:underline">Legal</Link>
                <span className="mx-2">›</span>
                <span>Domain Registration Data Disclosure Policy + Guide</span>
              </div>

              {/* Main Title */}
              <ContentDescription
                text="Domain Registration Data Disclosure Policy + Guide"
                size="xl"
                className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-left !text-white font-bold leading-tight"
              />

              {/* Last Update */}
              <p className="text-xs" style={{ color: 'rgb(156 163 175)' }}>
                Last Update: July 16, 2025
              </p>

              {/* Body Content */}
              <div className="space-y-4 sm:space-y-6 text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                <p>
                  Spaceship is committed to our customer&apos;s privacy, including domain registration data. We also understand that there may be legitimate reasons for requesting domain registration data. To navigate these requests, we comply with laws governing what must, can and/or cannot be shared and the compliance requirements surrounding each request and resulting decision.
                </p>
                <p>
                  We have put together this policy as a guide for you if you are seeking domain registration data, formerly known as Whois data. This guide incorporates the various legal requirements that apply to Spaceship.
                </p>
              </div>

              {/* Established Legal Mechanisms Heading */}
              <div 
                data-section-id="Established Legal Mechanisms"
                ref={(el) => { sectionRefs.current["Established Legal Mechanisms"] = el; }}
              >
                <ContentDescription
                  text="Established Legal Mechanisms"
                  size="lg"
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-left !text-white font-bold mt-8 sm:mt-10 md:mt-12"
                />
              </div>

              {/* US Court Order or Subpoena Section */}
              <div 
                data-section-id="US Court Order or Subpoena"
                ref={(el) => { sectionRefs.current["US Court Order or Subpoena"] = el; }}
                className="space-y-4 sm:space-y-6 mt-6 sm:mt-8"
              >
                <ContentDescription
                  text="US Court Order or Subpoena"
                  size="md"
                  className="text-base sm:text-lg md:text-xl text-left !text-white font-bold"
                />
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  Spaceship will comply with all disclosure requests issued via a US court order or subpoena. If you have a US court order or subpoena, you may submit it directly to{" "}
                  <Link href="mailto:legal@spaceship.com" className="underline" style={{ color: 'rgb(59 130 246)' }}>
                    legal@spaceship.com
                  </Link>
                  . Also see:{" "}
                  <Link href="https://www.spaceship.com/legal/spaceship-court-order-subpoena-policy/" className="underline" style={{ color: 'rgb(59 130 246)' }}>
                    https://www.spaceship.com/legal/spaceship-court-order-subpoena-policy/
                  </Link>
                  .
                </p>
                <div className="text-xs leading-relaxed mt-4" style={{ color: 'rgb(156 163 175)' }}>
                  <strong className="font-semibold" style={{ color: 'rgb(255 255 255)' }}>Please note:</strong> Domain registration data is not required in order to file a lawsuit against a domain registrant. You may file a lawsuit using the domain name and then, once filed, submit a subpoena in relation to the case which requests domain registrant data. You do not need to name Spaceship as a defendant in the lawsuit.
                </div>
              </div>

              {/* Uniform Dispute Resolution Policy (UDRP) Section */}
              <div 
                data-section-id="Uniform Dispute Resolution Policy (UDRP)"
                ref={(el) => { sectionRefs.current["Uniform Dispute Resolution Policy (UDRP)"] = el; }}
                className="space-y-4 sm:space-y-6 mt-8 sm:mt-10"
              >
                <ContentDescription
                  text="Uniform Dispute Resolution Policy (UDRP)"
                  size="md"
                  className="text-base sm:text-lg md:text-xl text-left !text-white font-bold"
                />
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  Spaceship complies with the UDRP. Disclosure of domain registration data is part of the UDRP process. This information is not needed in order to file a UDRP complaint. Therefore, Spaceship provides this information once a UDRP has been filed and a disclosure request is made by the assigned mediator. Disclosure is made directly to the mediator. Also see:{" "}
                  <Link href="https://www.spaceship.com/legal/uniform-domain-name-dispute-resolution-policy/" className="underline" style={{ color: 'rgb(59 130 246)' }}>
                    https://www.spaceship.com/legal/uniform-domain-name-dispute-resolution-policy/
                  </Link>
                  .
                </p>
              </div>

              {/* Non-US Court Order Section */}
              <div 
                data-section-id="Non-US Court Order"
                ref={(el) => { sectionRefs.current["Non-US Court Order"] = el; }}
                className="space-y-4 sm:space-y-6 mt-8 sm:mt-10"
              >
                <ContentDescription
                  text="Non-US Court Order"
                  size="md"
                  className="text-base sm:text-lg md:text-xl text-left !text-white font-bold"
                />
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  Spaceship reviews non-US court orders on a case by case basis to determine our obligations for disclosure and/or prohibitions against disclosure. If you are seeking domain registration data pursuant to a non-US court order, please submit your request along with the certified copy of the court order to{" "}
                  <Link href="mailto:legal@spaceship.com" className="underline" style={{ color: 'rgb(59 130 246)' }}>
                    legal@spaceship.com
                  </Link>
                  .
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  Please note that Spaceship is wholly US based. All court orders must be in English or have an accompanying certified translation of the order into English. If Spaceship is not subject to the jurisdiction of the issuing court, Spaceship will apply a disclosure Balancing Test.
                </p>
              </div>

              {/* Law Enforcement Section */}
              <div 
                data-section-id="Law Enforcement"
                ref={(el) => { sectionRefs.current["Law Enforcement"] = el; }}
                className="space-y-4 sm:space-y-6 mt-8 sm:mt-10"
              >
                <ContentDescription
                  text="Law Enforcement"
                  size="md"
                  className="text-base sm:text-lg md:text-xl text-left !text-white font-bold"
                />
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  Spaceship will disclose domain registration data to law enforcement pursuant to a US issued subpoena or other established law enforcement mechanisms. Requests that include a US issued subpoena or other established US law enforcement mechanism may be submitted directly to{" "}
                  <Link href="mailto:legal@spaceship.com" className="underline" style={{ color: 'rgb(59 130 246)' }}>
                    legal@spaceship.com
                  </Link>
                  .
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  For law enforcement based outside of the US, Spaceship reviews requests on a case-by-case basis and will apply a Balancing Test. All other requests should be submitted to{" "}
                  <Link href="mailto:legal@spaceship.com" className="underline" style={{ color: 'rgb(59 130 246)' }}>
                    legal@spaceship.com
                  </Link>
                  .
                </p>
              </div>

              {/* All Other Requests Section */}
              <div 
                data-section-id="All Other Requests"
                ref={(el) => { sectionRefs.current["All Other Requests"] = el; }}
                className="space-y-4 sm:space-y-6 mt-8 sm:mt-10"
              >
                <ContentDescription
                  text="All Other Requests"
                  size="md"
                  className="text-base sm:text-lg md:text-xl text-left !text-white font-bold"
                />
                
                {/* Balancing Test Sub-heading */}
                <div 
                  data-section-id="Balancing Test"
                  ref={(el) => { sectionRefs.current["Balancing Test"] = el; }}
                >
                  <ContentDescription
                    text="Balancing Test"
                    size="md"
                    className="text-base sm:text-lg md:text-xl text-left !text-white font-bold mt-4 sm:mt-6"
                  />
                </div>
                
                {/* First Paragraph */}
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  For all other requests, Spaceship will apply a legitimate interest balancing test where we apply the standards set by the General Data Protection Regulation (GDPR) (&quot;Balancing Test&quot;.) The Balancing Test weighs the requestor&apos;s legitimate interest in obtaining (i.e. processing) personal data against the potential impact on the registrant&apos;s (i.e. data subject&apos;s) rights and freedoms. The test is applied on a case by case basis. Factors that Spaceship considers include whether: the information is necessary to the legitimate interest being pursued by the requestor, there are less intrusive ways to achieve the same purpose, the information can be more appropriately provided under an existing legal mechanism, the requestor can be validated/verified by Spaceship, the requestor is located in a country not deemed &quot;adequate&quot; under the GDPR, and whether the request included sufficient, specific details for the reason for the request.
                </p>
                
                {/* Second Paragraph (Note) */}
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  Please note that these factors are not exhaustive. Also note that, while each factor will be weighed collectively, failure to include sufficiently detailed and supported reasons for the request will result in a denial of the request.
                </p>
                
                {/* Third Paragraph (Instruction) */}
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  When submitting a disclosure request under the Balancing Test, you must include:
                </p>
                
                {/* Numbered List */}
                <ol className="space-y-4 sm:space-y-6 text-xs leading-relaxed list-decimal list-inside" style={{ color: 'rgb(255 255 255)' }}>
                  <li>
                    <strong className="font-bold">Domain:</strong> Identification of the domain, which must be registered with Spaceship and actively in use.
                  </li>
                  <li>
                    <strong className="font-bold">Data Elements Requested:</strong> Please list the specific domain registration data elements requested.
                  </li>
                  <li>
                    <strong className="font-bold">Requestor:</strong> Identity of the Requestor. Identity must include the name of the individual and the name of the entity/agency that the person is a part of and also the name of any third party that they represent.
                  </li>
                  <li>
                    <strong className="font-bold">Type of Entity or Individual:</strong> Clarification of whether the Requestor is an individual or a business entity, including relevant details.
                  </li>
                  <li>
                    <strong className="font-bold">Authorization to Act:</strong> If you are asking on behalf of another party, you must provide the full name of the party, their relationship to the request and, if applicable, Power of Attorney or similar documents showing that the Requestor is authorized to act on behalf of another party.
                  </li>
                  <li>
                    <strong className="font-bold">Contact Information:</strong> Full details of how the Requestor can be contacted (name, email). This must be an individual name and not a generic reference.
                  </li>
                  <li>
                    <strong className="font-bold">Detailed Explanation of the Legitimate Interest:</strong> Requires a detailed explanation of the legitimate interest, including documentation and reasons why other legal mechanisms cannot be used.
                  </li>
                  <li>
                    <strong className="font-bold">Request is in Good Faith:</strong> States that by submitting, the Requestor attests to good faith and compliance with submission requirements.
                  </li>
                  <li>
                    <strong className="font-bold">Country Location:</strong> Asks for the Requestor&apos;s location and where information might be shared.
                  </li>
                  <li>
                    <strong className="font-bold">Further Disclosure:</strong> Requires details and explanations for any anticipated further disclosures.
                  </li>
                  <li>
                    <strong className="font-bold">Statement Under Perjury:</strong> A statement from the Requestor, under penalty of perjury, confirming the accuracy of information and authorization to make the request.
                  </li>
                  <li>
                    <strong className="font-bold">Agreement to Lawful Processing:</strong> An agreement to comply with additional measures required by law, including GDPR and EU-approved Standard Contractual Clauses. Also see:{" "}
                    <Link href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32021D0914" className="underline" style={{ color: 'rgb(59 130 246)' }}>
                      https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32021D0914
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="font-bold">Submit to:</strong> Specifies that the disclosure request should be submitted to{" "}
                    <Link href="mailto:disclosurerequests@spaceship.com" className="underline" style={{ color: 'rgb(59 130 246)' }}>
                      disclosurerequests@spaceship.com
                    </Link>
                    .
                  </li>
                </ol>
                
                {/* NOTE Section */}
                <div className="text-xs leading-relaxed mt-6 sm:mt-8" style={{ color: 'rgb(255 255 255)' }}>
                  <strong className="font-bold">NOTE:</strong> Urgent situations involving imminent threats (life, bodily injury, critical infrastructure, child exploitation) MUST be indicated in the subject line and require full details, justification for data disclosure, and contact information for the law enforcement agency/agent.
                </div>
                
                {/* Confirmation Reply */}
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  A confirmation reply will be provided promptly, and the outcome will be delivered via email within thirty (30) calendar days.
                </p>
                
                {/* Spaceship Discretion */}
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  Spaceship will determine, in its sole discretion, whether disclosure can be made.
                </p>
                
                {/* Right to Ban */}
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                  Spaceship reserves the right to ban requests from Requestors who are abusive, misrepresent facts, or create a significant risk to data subject rights and freedoms.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="lg:sticky lg:top-20"
            >
              <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-0">
                <div className="relative">
                  {/* Gray Background Line - Full Height */}
                  {whiteLineHeight > 0 && (
                    <div 
                      className="absolute left-0 w-0.5"
                      style={{ 
                        backgroundColor: 'rgba(156, 163, 175, 0.5)',
                        top: `${whiteLineTop}px`,
                        height: `${whiteLineHeight}px`,
                        zIndex: 1
                      }}
                    />
                  )}
                  
                  {/* Single Blue Indicator Line */}
                  <motion.div
                    className="absolute left-0 w-1 h-6 sm:h-8 rounded-full z-10"
                    style={{ backgroundColor: 'rgb(59 130 246)' }}
                    animate={{
                      top: indicatorTop
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                  <ul ref={sidebarListRef} className="space-y-2 sm:space-y-3 relative pl-2">
                    {sidebarItems.map((item, index) => {
                      const isActive = activeSection === item.id;
                      
                      return (
                        <li 
                          key={index} 
                          className="flex items-center"
                          ref={(el) => { sidebarItemRefs.current[item.id] = el; }}
                        >
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={`text-xs hover:underline block text-left w-full flex items-center transition-all ${
                              isActive ? 'font-bold' : ''
                            }`}
                            style={{ 
                              color: 'rgb(255 255 255)',
                              paddingLeft: '12px'
                            }}
                          >
                            <span>{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;

