document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Year update
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
    
  }

  // 3. Header scroll class
  const header = document.querySelector('[data-header]');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 4. Mobile Menu Toggle
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 5. Modal Live Demo Form
  const modalBackdrop = document.querySelector('[data-modal]');
  const modalOpenBtns = document.querySelectorAll('[data-open-modal]');
  const modalCloseBtns = document.querySelectorAll('[data-close-modal]');
  const modalForm = document.querySelector('[data-modal-form]');
  const modalSuccess = document.querySelector('[data-modal-success]');

  function openModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (modalForm) modalForm.reset();
      if (modalSuccess) modalSuccess.classList.add('hidden');
      if (modalForm) modalForm.classList.remove('hidden');
    }
  }

  modalOpenBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  modalCloseBtns.forEach(btn => btn.addEventListener('click', closeModal));

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      modalForm.classList.add('hidden');
      if (modalSuccess) modalSuccess.classList.remove('hidden');
    });
  }

  // 6. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('[data-faq-item]');
  faqItems.forEach(item => {
    const headerBtn = item.querySelector('[data-faq-btn]');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    
    if (headerBtn && answer) {
      headerBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(i => {
          i.classList.remove('active');
          const ans = i.querySelector('.faq-answer');
          const icn = i.querySelector('.faq-icon');
          if (ans) ans.classList.add('hidden');
          if (icn) icn.classList.remove('rotate-180');
        });
        
        // Toggle current item
        if (!isOpen) {
          item.classList.add('active');
          answer.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });

  // 7. Language Switcher (AR / EN)
  const langToggleBtns = document.querySelectorAll('[data-lang-toggle]');
  let currentLang = 'ar';

  const translations = {
    ar: {
      lang: 'English',
      home: 'الرئيسية',
      about: 'تعرف علينا',
      solutions: 'حلول الأعمال',
      modules: 'الأنظمة والوحدات',
      sectors: 'القطاعات',
      services: 'الخدمات',
      pricing: 'الأسعار',
      contact: 'تواصل معنا',
      demo: 'اطلب عرضاً توضيحياً',
      start: 'ابدأ الآن',
      eyebrow: 'حلول ERP مرنة مبنية على ERPNext',
      heroTitle1: 'نحوّل عمليات شركتك إلى',
      heroTitle2: 'نظام ERP واحد متكامل',
      heroDesc: 'نحلّل طريقة عمل منشأتك، ثم نصمّم ونخصّص ونطوّر نظام ERPNext ليتوافق مع دورة العمل الفعلية — من المحاسبة والمبيعات إلى التصنيع والموارد البشرية والتكاملات.',
      heroBadge1: 'إعداد وتخصيص ERPNext',
      heroBadge2: 'تطوير برمجي مخصص',
      heroBadge3: 'الربط والدعم الفني',
      explore: 'استكشف الحلول',
      customized: 'واجهة ERPNext بعد تخصيصها بواسطة ZETIX',
      faqTitle: 'الأسئلة الشائعة حول ERPNext و ZETIX',
      faqDesc: 'كل ما تحتاج معرفته عن إعداد وتخصيص وتطبيق النظام.',
      faqEyebrow: 'الأسئلة الشائعة',
      faq1Q: 'ما الفرق بين ERPNext النظام المفتوح وبين الأنظمة الجاهزة المغلقة؟',
      faq1A: 'نظام ERPNext يوفر لك مرونة كاملة وملكية حرة للبيانات دون فرض رسوم تراخيص باهظة لكل موظف كما في الأنظمة المغلقة. يمكنك إضافة وتعديل الشاشات والتقارير والربط مع أي نظام خارجي بحرية تامة.',
      faq2Q: 'هل ZETIX ERP تدعم الفوترة الإلكترونية المرحلة الثانية (ZATCA Phase 2)؟',
      faq2A: 'نعم، نقوم بإعداد وتطوير وحدة الربط المباشر مع منصة هيئة الزكاة والضريبة والجمارك (ZATCA Fatoora Phase 2) لإنشاء الفواتير الضريبية المبسطة والفواتير التجارية وإرسالها فورياً بصيغة XML المتوافقة مع التشفير والـ QR Code.',
      faq3Q: 'كم يستغرق مشروع تنفيذ وتخصيص ERPNext؟',
      faq3A: 'تتراوح المدة حسب نطاق العمل؛ فالباقات الجاهزة الصغيرة قد تستغرق من 2 إلى 4 أسابيع، بينما المشاريع المخصصة للشركات المتوسطة والمصانع تتراوح عادة بين 6 إلى 12 أسبوعاً شاملة التحليل والبرمجة ونقل البيانات والتدريب.',
      faq4Q: 'كيف يتم نقل بياناتنا الحالية من الأنظمة القديمة إلى ERPNext؟',
      faq4A: 'يقوم فريقنا بتجهيز قوالب Excel / CSV المخصصة لاستيراد بيانات العملاء، الموردين، الأصناف، شجرة الحسابات، والأرصدة الافتتاحية. ويتم تدقيق البيانات وتجربتها على بيئة تجريبية Staging قبل اعتمادها على البيئة الحية.',
      faq5Q: 'ما هي خيارات الاستضافة والدعم الفني المتاحة؟',
      faq5A: 'نوفر خيارات الاستضافة السحابية المدارة الموثوقة داخل السعودية بأعلى مستويات الحماية ومعدل قوام 99.9%، كما نوفر خيار التثبيت على الخوادم الخاصة للعميل. كما نقدم اتفاقيات مستوى خدمة SLA للدعم الفني والتأهيل المستمر.',
      lifecycleTitle: 'رحلة تطبيق النظام من الدراسة إلى الدعم المستمر',
      lifecycleDesc: 'منهجية واضحة ومجربة تضمن انتقال منشأتك إلى النظام الجديد بدون توقف عملياتك اليومية.',
      methodologyEyebrow: 'المنهجية',
      meth1Title: 'دراسة وتحليل الاحتياجات',
      meth1Desc: 'فهم الدورات المستندية الحالية، صلاحيات الموظفين، نقاط الألَم، والتقارير المطلوبة.',
      meth2Title: 'تصميم هندسة النظام',
      meth2Desc: 'رسم مسار العمليات الفعلي وإعداد شجرة الحسابات والهيكل التنظيمي.',
      meth3Title: 'التخصيص والبرمجة',
      meth3Desc: 'تهيئة الوحدات، تعديل النماذج، بناء التقارير الخاصة والتكامل مع هيئة الزكاة (ZATCA).',
      meth4Title: 'تنقية ونقل البيانات',
      meth4Desc: 'تجهيز قوالب النقل، استيراد العملاء والموردين والأصناف والأرصدة الافتتاحية بدقة.',
      meth5Title: 'التدريب والتشغيل الفعلي',
      meth5Desc: 'اختبار قبول المستخدمين، تدريب الموظفين، ثم إطلاق النظام للتشغيل الحي.',
      meth6Title: 'الدعم الفني والتحسين المستمر',
      meth6Desc: 'متابعة الأداء، معالجة الملاحظات، وإضافة ميزات جديدة مع توسع أعمال المنشأة.',
      servicesTitle: 'خدماتنا المتخصصة في أنظمة ERP',
      servicesDesc: 'منظومة خدمات كاملة تشمل الاستشارة والبرمجة والتطوير المستمر.',
      pricingTitle: 'خيارات تناسب حجم وطبيعة منشأتك',
      pricingDesc: 'اختر النموذج الأنسب لبدء التحول الرقمي بمرونة وموثوقية.',
      pack1Title: 'الباقة الجاهزة',
      pack1Desc: 'مناسبة للمؤسسات والشركات الناشئة التي تحتاج وظائف المحاسبة والمبيعات والمخزون الأساسية.',
      pack1Price: 'اشتراك شهري / سنوي اقتصادي',
      pack1Btn: 'سجل اهتمامك الآن',
      pack2Title: 'نظام ERP مخصص',
      pack2Desc: 'للشركات المتوسطة التي تتطلب تحليل دورة العمل، تخصيص شاشات، تقارير خاصة، وتكاملات خارجية.',
      pack2Price: 'السعر حسب حجم المشروع ونطاق العمل (Scope of Work)',
      pack2Btn: 'اطلب عرض سعر مخصص',
      pack3Title: 'المجموعات القابضة',
      pack3Desc: 'للمجموعات ذات الشركات التابعة المتعددة، المصانع، وخطوط الإنتاج.',
      pack3Price: 'دراسة شاملة وتصميم معماري كامل',
      pack3Btn: 'ناقش مشروع المجموعة',
      readyTitle: 'هل تحتاج نظام ERP مطابق لطريقة عمل شركتك؟',
      readyDesc: 'احجز جلسة استشارية أولية مع مهندسينا لمناقشة حجم العمليات، عدد الموظفين، الوحدات والتكاملات المطلوبة.',
      sales: 'قسم المبيعات الاستشارية',
      admin1: 'الإدارة العامة 1',
      admin2: 'الإدارة العامة 2',
      emailLabel: 'البريد الإلكتروني الرسمي',
      addressLabel: 'العنوان الرئيسي',
      address: 'مبنى التجاري العالمي، مكتب 801 - شارع الأحوص - حي الصفا - طريق الحرمين السريع - جدة - المملكة العربية السعودية',
      modulesTitle: 'كل أقسام منشأتك في منصة واحدة متكاملة',
      modulesDesc: 'اختر الوحدة التي تحتاجها الآن، وأضف المزيد بسلاسة عندما تتوسع أعمالك.',
      mod1: 'المحاسبة', mod2: 'المبيعات', mod3: 'المشتريات', mod4: 'المخزون', mod5: 'CRM', mod6: 'الموارد البشرية', mod7: 'الرواتب',
      mod8: 'المشاريع', mod9: 'التصنيع', mod10: 'الأصول', mod11: 'الصيانة', mod12: 'نقاط البيع',
      modSub1: 'المالية', modSub2: 'إدارة المبيعات', modSub3: 'إدارة المشتريات', modSub4: 'المستودعات', modSub5: 'علاقات العملاء', modSub6: 'شؤون الموظفين', modSub7: 'مسيرات الرواتب', modSub8: 'إدارة المهام', modSub9: 'عمليات الإنتاج', modSub10: 'إدارة الأصول', modSub11: 'إدارة الصيانة', modSub12: 'الكاشير',
      viewModules: 'استعرض جميع الوحدات والميزات',
      whyTitle: 'شريك تقني يفهم أعمالك قبل أن يبدأ بالبرمجة',
      whyDesc: 'لا نبدأ من برنامج تقليدي ونفرضه على العميل، بل نبدأ بدراسة العمليات، المستخدمين، الصلاحيات، والتقارير الفعلية، ثم نخصّص ونطوّر ERPNext ليلائم حجم وتطلعات منشأتك.',
      abtF1Title: 'تحليل الأعمال ودورات العمل', abtF1Desc: 'ندرس الدورات المستندية والعمليات التشغيلية داخل المنشأة قبل البدء بالإعداد.',
      abtF2Title: 'تخصيص مرن وتعديل النماذج', abtF2Desc: 'نكيّف الحقول، الشاشات، مسارات الموافقة، والصلاحيات مع احتياج منشأتك.',
      abtF3Title: 'تطوير البرمجيات والتقارير', abtF3Desc: 'برمجة ميزات مخصصة، تقارير طباعة رسمية، ووظائف ذكية غير متوفرة افتراضياً.',
      abtF4Title: 'تدريب الكادر والموظفين', abtF4Desc: 'تدريب مكثف وعملي لجميع المستويات الإدارية والتشغيلية على مهامهم اليومية.',
      abtF5Title: 'دعم فني ومتابعة المستمرة', abtF5Desc: 'فريق دقيق جاهز للرد على استفسارات الموظفين وتطوير النظام مع نمو الأعمال.',
      abtF6Title: 'استضافة آمنة عالية السرعة', abtF6Desc: 'خيارات استضافة سحابية فائقة السرعة أو خوادم خاصة محلية مع نسخ احتياطي تلقائي.',
      erpTitle: 'منصة عالمية نبني عليها حلولاً مخصصة تناسب بيئة الأعمال السعودية',
      erpDesc: 'نستخدم ERPNext كمنصة مفتوحة وقابلة للتوسع بشكل مطلق، ونقوم نحن بكافة أعمال التحليل والإعداد والتعديل البرمجي لضمان توافق تام مع متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA Phase 2).',
      plat1: 'قابلية التخصيص', plat2: 'قابلية التوسع', plat3: 'تعدد الشركات', plat4: 'تعدد الفروع', plat5: 'تعدد العملات', plat6: 'واجهة عربي / EN', plat7: 'Cloud / Private', plat8: 'API Integration', plat9: 'صلاحيات وأمان',
      sectorsTitle: 'حلول مرنة تناسب مختلف القطاعات الاقتصادية',
      sectorsDesc: 'تم تصميم حلولنا لتلبي احتياجات الشركات التجارية، الخدمية، المصانع، والمجموعات متعددة النشاطات.',
      sec1Title: 'التجارة والتوزيع', sec1Desc: 'إدارة المبيعات، الشراء، المستودعات الفردية والمتعددة، وتتبع العملاء والموردين بدقة.',
      sec2Title: 'التصنيع والإنتاج', sec2Desc: 'قائمة المواد (BOM)، أوامر الإنتاج، تخطيط الاحتياجات، وحساب التكاليف المباشرة وغير المباشرة.',
      sec3Title: 'الشركات الخدمية', sec3Desc: 'إدارة المشاريع، التكاليف الفعلية، العقود الدورية، الفوترة الذكية، وخدمات الدعم الفني.',
      sec4Title: 'المجموعات والمؤسسات', sec4Desc: 'إدارة شبكة من الشركات والفروع داخل بيئة موحدة مع تقارير تجميعية مجمعة Consolidated.',
      serv1Title: 'تحليل وتوثيق', serv1Desc: 'تحليل متطلبات الأعمال، توثيق دورة المستندات، وتحديد نقاط التحسين التشغيلي.',
      serv2Title: 'إعداد وتخصيص', serv2Desc: 'إعداد وتخصيص دليل الحسابات، المستودعات، مراكز التكلفة والصلاحيات.',
      serv3Title: 'تطوير وبرمجة', serv3Desc: 'تطوير تطبيقات وتعديلات برمجية خاصة بأداء متميز وتكامل سلس.',
      serv4Title: 'تكامل وربط', serv4Desc: 'ربط ERPNext مع منصات التجارة الإلكترونية، بوابات الدفع، وهيئة الزكاة ZATCA.',
      serv5Title: 'نقل البيانات', serv5Desc: 'تجميع وتنظيف البيانات القديمة ونقلها بأمان التام للنظام الجديد.',
      serv6Title: 'تدريب ودعم', serv6Desc: 'تدريب الفرق، خطط دعم فني مستمرة SLA وتحديثات دورية مرنة.',
      modBadge: 'طلب عرض توضيحي', modTitle: 'احجز جلسة استعراض لنظام ZETIX ERP', modDesc: 'أدخل بياناتك وسيتواصل معك مستشار التقنية خلال 24 ساعة.',
      lblName: 'الاسم الكامل *', lblCompany: 'اسم الشركة / المنشأة *', lblPhone: 'رقم الجوال *', lblEmployees: 'عدد الموظفين', lblEmail: 'البريد الإلكتروني',
      opt1: '1 - 10 موظفين', opt2: '11 - 50 موظف', opt3: '51 - 200 موظف', opt4: 'أكثر من 200 موظف',
      btnSubmit: 'إرسال طلب العرض التوضيحي',
      successTitle: 'تم استلام طلبك بنجاح!', successDesc: 'شكراً لتواصلك مع ZETIX ERP. سيتواصل معك أحد المستشارين في أقرب وقت.', btnClose: 'إغلاق',
      discussProject: 'ناقش مشروعك مع خبرائنا',
      whatsappCall: 'محادثة واتساب مباشرة',
      footerDesc: 'حلول ERPNext المتكاملة، تحليل الأعمال، التخصيص، تطوير البرمجيات والتكامل، نقل البيانات، والتدريب والدعم الفني للشركات في المملكة العربية السعودية.',
      footerQuickLinks: 'روابط سريعة',
      footerAbout: 'تعرف علينا',
      footerModules: 'الأنظمة والوحدات',
      footerServices: 'الخدمات الاستشارية',
      footerPricing: 'خيارات الأسعار',
      contactUs: 'تواصل مباشر',
      footerWhatsapp: 'محادثة WhatsApp',
      footerRights: 'جميع الحقوق محفوظة.',
      footerPrivacy: 'سياسة الخصوصية',
      footerTerms: 'الشروط والأحكام',
      valueEyebrow: 'قيمة ZETIX ERP',
      poweredEyebrow: 'مدعوم بنظام ERPNext',
      sectorsEyebrow: 'القطاعات المستهدفة',
      servicesEyebrow: 'الخدمات',
      pack1Eyebrow: 'الباقة الأساسية',
      pack2Eyebrow: 'نظام المؤسسات المخصص',
      pack3Eyebrow: 'المجموعات القابضة',
      contactEyebrow: 'تواصل مع ZETIX ERP',
      methBannerTag: 'منهجية معتمدة',
      methBannerTitle: 'ننتقل بك نحو المستقبل خطوة بخطوة',
      aboutBannerText: 'فريق خبراء ZETIX',
      sectorsBannerText: 'نغطي كافة القطاعات بمرونة واحترافية',
      showcaseEyebrow: 'استعراض المنصة',
      showcaseTitle: 'تصميم عصري يضع كل بياناتك في متناول يدك',
      showcaseDesc: 'واجهة مستخدم تفاعلية، لوحات تحكم قابلة للتخصيص، وتحليلات لحظية تساعدك على اتخاذ قرارات دقيقة وسريعة.',
      showcaseImg1Title: 'مؤشرات أداء تفاعلية (KPIs)',
      showcaseImg1Desc: 'راقب مبيعاتك، مصاريفك، ومخزونك في شاشة واحدة متصلة بالبيانات الحية.',
      showcaseFeat1Title: 'تقارير ديناميكية ذكية',
      showcaseFeat1Desc: 'صمم تقاريرك الخاصة بالسحب والإفلات، وصدرها بصيغ متعددة بضغطة زر واحدة.',
      showcaseFeat2Title: 'تجربة مستخدم لا مثيل لها',
      showcaseFeat2Desc: 'شاشات مصممة بعناية فائقة لتقليل النقرات وتسهيل وصول الموظفين لأدواتهم اليومية دون تعقيد.',
    },
    en: {
      lang: 'العربية',
      home: 'Home',
      about: 'About Us',
      solutions: 'Business Solutions',
      modules: 'Modules',
      sectors: 'Industries',
      services: 'Services',
      pricing: 'Pricing',
      contact: 'Contact Us',
      demo: 'Request Demo',
      start: 'Get Started',
      eyebrow: 'Flexible ERP Solutions Powered by ERPNext',
      heroTitle1: 'Transform your business operations into',
      heroTitle2: 'One Integrated ERP System',
      heroDesc: 'We analyze your business workflow, then design, customize, and develop ERPNext to match your actual operations — from accounting and sales to manufacturing, HR, and advanced integrations.',
      heroBadge1: 'ERPNext Configuration',
      heroBadge2: 'Custom Development',
      heroBadge3: 'Integration & Support',
      explore: 'Explore Solutions',
      customized: 'ERPNext interface customized by ZETIX',
      faqTitle: 'Frequently Asked Questions',
      faqDesc: 'Everything you need to know about setting up, customizing, and implementing the system.',
      faqEyebrow: 'FREQUENTLY ASKED QUESTIONS',
      faq1Q: 'What is the difference between open-source ERPNext and closed proprietary systems?',
      faq1A: 'ERPNext provides complete flexibility and data ownership without imposing expensive per-user licensing fees like closed systems. You can freely add or modify screens, reports, and integrate with any external system.',
      faq2Q: 'Does ZETIX ERP support ZATCA E-Invoicing Phase 2?',
      faq2A: 'Yes, we develop and configure direct integration with ZATCA (Fatoora Phase 2) to generate simplified and standard tax invoices, instantly sending them in XML format compliant with cryptography and QR codes.',
      faq3Q: 'How long does an ERPNext implementation and customization project take?',
      faq3A: 'The duration varies by scope. Small ready-made packages can take 2 to 4 weeks, while custom projects for medium enterprises and factories usually range from 6 to 12 weeks, including analysis, programming, data migration, and training.',
      faq4Q: 'How is our current data migrated from old systems to ERPNext?',
      faq4A: 'Our team prepares custom Excel/CSV templates to import customer, supplier, item data, chart of accounts, and opening balances. The data is audited and tested on a staging environment before going live.',
      faq5Q: 'What hosting and technical support options are available?',
      faq5A: 'We provide reliable managed cloud hosting in Saudi Arabia with high security and 99.9% uptime, as well as on-premise installation options. We also offer SLA technical support and continuous improvement plans.',
      lifecycleTitle: 'Implementation Journey from Analysis to Ongoing Support',
      lifecycleDesc: 'A clear, proven methodology ensuring your transition to the new system without disrupting daily operations.',
      methodologyEyebrow: 'METHODOLOGY',
      meth1Title: 'Requirement Analysis',
      meth1Desc: 'Understanding current document cycles, user roles, pain points, and required reports.',
      meth2Title: 'Solution Design',
      meth2Desc: 'Mapping the actual workflow and setting up the chart of accounts and organizational structure.',
      meth3Title: 'Setup & Development',
      meth3Desc: 'Configuring modules, customizing forms, building special reports, and ZATCA integration.',
      meth4Title: 'Data Migration',
      meth4Desc: 'Preparing migration templates, accurately importing customers, suppliers, items, and opening balances.',
      meth5Title: 'Go-Live & Training',
      meth5Desc: 'User Acceptance Testing (UAT), staff training, then launching the system for live operation.',
      meth6Title: 'Technical Support & Continuous Improvement',
      meth6Desc: 'Performance monitoring, addressing feedback, and adding new features as your business grows.',
      servicesTitle: 'Our Specialized ERP Services',
      servicesDesc: 'A complete service ecosystem including consultation, development, and continuous improvement.',
      pricingTitle: 'Options that fit your business size',
      pricingDesc: 'Choose the best model to start your digital transformation flexibly and reliably.',
      pack1Title: 'Starter Package',
      pack1Desc: 'Suitable for startups and small businesses needing basic accounting, sales, and inventory.',
      pack1Price: 'Economical Monthly / Annual Subscription',
      pack1Btn: 'Register your interest',
      pack2Title: 'Custom ERP System',
      pack2Desc: 'For medium businesses requiring workflow analysis, custom screens, special reports, and integrations.',
      pack2Price: 'Price based on project size and Scope of Work',
      pack2Btn: 'Request Custom Quote',
      pack3Title: 'Holding Groups',
      pack3Desc: 'For groups with multiple subsidiaries, factories, and complex production lines.',
      pack3Price: 'Comprehensive study and full architecture design',
      pack3Btn: 'Discuss Group Project',
      readyTitle: 'Need an ERP system tailored to your workflow?',
      readyDesc: 'Book an initial consultation with our engineers to discuss operations volume, employees, required modules and integrations.',
      sales: 'Consulting Sales Department',
      admin1: 'General Management 1',
      admin2: 'General Management 2',
      emailLabel: 'Official Email',
      addressLabel: 'Main Address',
      address: 'World Trade Building, Office 801 - Al-Ahwas Street - Al-Safa District - Haramain Expressway - Jeddah - Kingdom of Saudi Arabia',
      modulesTitle: 'All your company departments in one integrated platform',
      modulesDesc: 'Choose the module you need now, and add more seamlessly as your business expands.',
      mod1: 'Accounting', mod2: 'Sales', mod3: 'Buying', mod4: 'Stock', mod5: 'CRM', mod6: 'HR', mod7: 'Payroll',
      mod8: 'Projects', mod9: 'Manufacturing', mod10: 'Assets', mod11: 'Maintenance', mod12: 'POS',
      modSub1: 'Finance', modSub2: 'Sales Mgmt', modSub3: 'Procurement', modSub4: 'Inventory', modSub5: 'Customer Relations', modSub6: 'Human Resources', modSub7: 'Payroll', modSub8: 'Task Mgmt', modSub9: 'Production', modSub10: 'Asset Mgmt', modSub11: 'Maintenance', modSub12: 'Cashier',
      viewModules: 'View all modules and features',
      whyTitle: 'A technical partner who understands your business before coding',
      whyDesc: 'We don\'t start with a generic software and force it on the client. We start by studying the actual operations, users, permissions, and reports, then customize and develop ERPNext to fit your organization\'s size and aspirations.',
      abtF1Title: 'Business & Workflow Analysis', abtF1Desc: 'We study your document cycles and operational workflows before setup.',
      abtF2Title: 'Flexible Customization & Forms', abtF2Desc: 'We adapt fields, screens, approval paths, and permissions to your needs.',
      abtF3Title: 'Software & Reports Development', abtF3Desc: 'Programming custom features, official print formats, and smart functions.',
      abtF4Title: 'Staff & Employee Training', abtF4Desc: 'Intensive practical training for all management and operational levels.',
      abtF5Title: 'Technical Support & Follow-up', abtF5Desc: 'A dedicated team ready to answer queries and develop the system as you grow.',
      abtF6Title: 'Fast & Secure Hosting', abtF6Desc: 'Ultra-fast cloud hosting or local private servers with automatic backups.',
      erpTitle: 'A global platform on which we build custom solutions for the Saudi business environment',
      erpDesc: 'We use ERPNext as an open and infinitely scalable platform, and we perform all analysis, configuration, and custom development to ensure full compliance with ZATCA Phase 2 requirements.',
      plat1: 'Customizability', plat2: 'Scalability', plat3: 'Multi-Company', plat4: 'Multi-Branch', plat5: 'Multi-Currency', plat6: 'AR / EN Interface', plat7: 'Cloud / Private', plat8: 'API Integration', plat9: 'Permissions & Security',
      sectorsTitle: 'Flexible solutions suitable for various economic sectors',
      sectorsDesc: 'Our solutions are designed to meet the needs of commercial, service, manufacturing companies, and multi-activity groups.',
      sec1Title: 'Trade & Distribution', sec1Desc: 'Manage sales, purchasing, single/multi warehouses, and accurately track customers and suppliers.',
      sec2Title: 'Manufacturing & Production', sec2Desc: 'Bill of Materials (BOM), production orders, material planning, and direct/indirect cost calculation.',
      sec3Title: 'Service Companies', sec3Desc: 'Manage projects, actual costs, periodic contracts, smart billing, and support services.',
      sec4Title: 'Groups & Enterprises', sec4Desc: 'Manage a network of companies and branches in a unified environment with consolidated reporting.',
      serv1Title: 'Analysis & Documentation', serv1Desc: 'Analyze business requirements, document cycles, and identify operational improvements.',
      serv2Title: 'Setup & Customization', serv2Desc: 'Configure Chart of Accounts, warehouses, cost centers, and user permissions.',
      serv3Title: 'Development & Coding', serv3Desc: 'Develop custom apps and modifications with excellent performance and seamless integration.',
      serv4Title: 'Integration & Connectivity', serv4Desc: 'Connect ERPNext with e-commerce, payment gateways, and ZATCA Phase 2.',
      serv5Title: 'Data Migration', serv5Desc: 'Collect, clean, and safely transfer legacy data to the new system.',
      serv6Title: 'Training & Support', serv6Desc: 'Team training, continuous SLA support plans, and flexible periodic updates.',
      modBadge: 'Request a Demo', modTitle: 'Book a ZETIX ERP Demo Session', modDesc: 'Enter your details and a technical consultant will contact you within 24 hours.',
      lblName: 'Full Name *', lblCompany: 'Company / Organization Name *', lblPhone: 'Mobile Number *', lblEmployees: 'Number of Employees', lblEmail: 'Email Address',
      opt1: '1 - 10 Employees', opt2: '11 - 50 Employees', opt3: '51 - 200 Employees', opt4: 'Over 200 Employees',
      btnSubmit: 'Submit Demo Request',
      successTitle: 'Request Received Successfully!', successDesc: 'Thank you for contacting ZETIX ERP. A consultant will reach out to you shortly.', btnClose: 'Close',
      discussProject: 'Discuss your project with our experts',
      whatsappCall: 'Direct WhatsApp Chat',
      footerDesc: 'Integrated ERPNext solutions, business analysis, customization, software development, data migration, training, and technical support for companies in Saudi Arabia.',
      footerQuickLinks: 'QUICK LINKS',
      footerAbout: 'About Us',
      footerModules: 'Modules & Systems',
      footerServices: 'Consulting Services',
      footerPricing: 'Pricing Options',
      contactUs: 'DIRECT CONTACT',
      footerWhatsapp: 'WhatsApp Chat',
      footerRights: 'All rights reserved.',
      footerPrivacy: 'Privacy Policy',
      footerTerms: 'Terms & Conditions',
      valueEyebrow: 'ZETIX ERP VALUE',
      poweredEyebrow: 'POWERED BY ERPNEXT',
      sectorsEyebrow: 'TARGET SECTORS',
      servicesEyebrow: 'SERVICES',
      pack1Eyebrow: 'STARTER',
      pack2Eyebrow: 'CUSTOM ENTERPRISE',
      pack3Eyebrow: 'HOLDING / GROUPS',
      contactEyebrow: 'TALK TO ZETIX ERP',
      methBannerTag: 'APPROVED METHODOLOGY',
      methBannerTitle: 'Taking You Towards the Future, Step by Step',
      aboutBannerText: 'ZETIX Expert Team',
      sectorsBannerText: 'Covering All Sectors with Flexibility and Professionalism',
      showcaseEyebrow: 'PLATFORM SHOWCASE',
      showcaseTitle: 'Modern Design Putting Data at Your Fingertips',
      showcaseDesc: 'Interactive UI, customizable dashboards, and real-time analytics to help you make fast, accurate decisions.',
      showcaseImg1Title: 'Interactive KPIs',
      showcaseImg1Desc: 'Monitor sales, expenses, and inventory in one screen connected to live data.',
      showcaseFeat1Title: 'Smart Dynamic Reports',
      showcaseFeat1Desc: 'Design custom reports with drag-and-drop, and export in multiple formats with one click.',
      showcaseFeat2Title: 'Unmatched User Experience',
      showcaseFeat2Desc: 'Carefully crafted screens to reduce clicks and simplify daily operations for your staff.',
    }
  };

  const globalLoader = document.getElementById('global-loader');

  // Hide loader on initial load
  window.addEventListener('load', () => {
    if (globalLoader) {
      globalLoader.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => globalLoader.classList.add('hidden'), 300);
    }
  });

  langToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Show loader
      if (globalLoader) {
        globalLoader.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      }

      setTimeout(() => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        const dict = translations[currentLang];

        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        // Translate all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (dict[key]) {
            el.textContent = dict[key];
          }
        });

        // Hide loader
        if (globalLoader) {
          globalLoader.classList.add('opacity-0', 'pointer-events-none');
          setTimeout(() => globalLoader.classList.add('hidden'), 300);
        }
      }, 600);
    });
  });

  // 8. Interactive Dashboard Mockup Period Switcher
  const mockupStats = {
    month: { rev: 'SAR 2.48M', revUp: '+18.4%', ord: '1,842', ordUp: '+9.1%', rec: 'SAR 412K', val: 'SAR 870K' },
    quarter: { rev: 'SAR 7.12M', revUp: '+22.1%', ord: '5,310', ordUp: '+14.5%', rec: 'SAR 680K', val: 'SAR 940K' },
    year: { rev: 'SAR 28.5M', revUp: '+31.0%', ord: '21,490', ordUp: '+28.2%', rec: 'SAR 1.2M', val: 'SAR 1.1M' }
  };

  const periodBtns = document.querySelectorAll('[data-period-btn]');
  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      periodBtns.forEach(b => b.classList.remove('bg-brand', 'text-white', 'shadow-sm'));
      periodBtns.forEach(b => b.classList.add('bg-white', 'text-slate-500'));

      btn.classList.remove('bg-white', 'text-slate-500');
      btn.classList.add('bg-brand', 'text-white', 'shadow-sm');

      const period = btn.getAttribute('data-period-btn');
      const data = mockupStats[period];
      if (data) {
        const revEl = document.querySelector('[data-stat-rev]');
        const ordEl = document.querySelector('[data-stat-ord]');
        const recEl = document.querySelector('[data-stat-rec]');
        const valEl = document.querySelector('[data-stat-val]');
        if (revEl) revEl.textContent = data.rev;
        if (ordEl) ordEl.textContent = data.ord;
        if (recEl) recEl.textContent = data.rec;
        if (valEl) valEl.textContent = data.val;
      }
    });
  });
});
