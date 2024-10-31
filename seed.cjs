const edgedb = require('edgedb');

const db = edgedb.createClient();

const blogPosts = [
  {
    title: "The Rise of Remote Work: Navigating the New Normal",
    content: "Remote work has surged in popularity due to technological advancements and recent global events. This article delves into how companies are adapting to remote work, the challenges faced, and the tools that are making remote operations possible. From communication software to project management tools, learn how businesses maintain productivity and employee engagement in a virtual environment. Additionally, explore tips for remote workers on maintaining work-life balance and staying productive in their new work settings. With detailed case studies and expert opinions, this article offers a comprehensive look at the future of work.",
    author: "John Doe"
  },
  {
    title: "Eco-Friendly Living: Simple Steps to a Greener Home",
    content: "Embracing eco-friendly living does not require a complete lifestyle overhaul. This post explores easy and practical steps anyone can take to make their home more environmentally friendly. From reducing waste and conserving energy to choosing sustainable products and utilizing green technologies, discover how small changes can make a big impact on your carbon footprint and help you lead a more sustainable life. Featuring interviews with sustainability experts and case studies from eco-friendly households, this guide is a must-read for anyone looking to reduce their environmental impact.",
    author: "Jane"
  },
  {
    title: "Artificial Intelligence in Healthcare: Shaping the Future of Medicine",
    content: "Artificial intelligence (AI) is revolutionizing the healthcare industry by enhancing everything from diagnosis processes to treatment protocol development and patient monitoring. This article provides an in-depth analysis of current AI applications in healthcare and their transformative potential. Learn about AI-driven diagnostics, robotic surgery, and personalized medicine. The post also discusses ethical considerations, challenges, and the future direction of AI in medicine, making it a valuable resource for healthcare professionals and technology enthusiasts alike.",
    author: "Alice Johnson"
  },
  {
    title: "Understanding Cryptocurrency: Basics for Beginners",
    content: "Cryptocurrency has become a global phenomenon, but it can be challenging for beginners to understand. This comprehensive guide covers the basics of cryptocurrency: what it is, how it works, and how to get started with investing. It breaks down complex concepts like blockchain technology, mining, and digital wallets. By the end of this article, readers will have a solid understanding of cryptocurrencies and be better equipped to participate in digital currency exchanges.",
    author: "Michael Lee"
  },
  {
    title: "The Impact of Global Warming on Marine Life",
    content: "Global warming is having a profound impact on marine ecosystems around the world. This article explores the effects of rising sea temperatures on marine biodiversity, including coral bleaching, shifts in species distribution, and changes in food chains. It also discusses the broader implications for fisheries and human communities dependent on these ecosystems. Through scientific research and expert interviews, this post offers a detailed look at the challenges marine life faces and what can be done to mitigate these effects.",
    author: "Rachel Williams"
  },
  {
    title: "The Evolution of Electric Vehicles: Past, Present, and Future",
    content: "Electric vehicles (EVs) are set to play a pivotal role in reducing global carbon emissions. This article traces the history of EVs, examines the current state of the industry, and forecasts future trends. It highlights advancements in battery technology, infrastructure developments, and governmental policies driving EV adoption. With insights from industry leaders, this post provides a thorough analysis of the economic and environmental impact of electric vehicles and their potential to transform transportation.",
    author: "David Anderson"
  },
  {
    title: "The Science of Happiness: Strategies for Mental Well-Being",
    content: "Understanding the science behind what makes us happy is crucial for mental health. This article delves into psychological research that reveals how habits, relationships, and daily activities affect our happiness. It offers practical advice on how to cultivate a happier mindset through mindfulness, social connectivity, and lifestyle changes. Featuring expert advice and real-life stories, this post is an uplifting guide to achieving better mental health and finding joy in everyday life.",
    author: "Laura Green"
  },
  {
    title: "Mastering Personal Finance: Tips for Financial Freedom",
    content: "Achieving financial freedom is a goal for many, but it requires discipline and knowledge. This article provides essential tips on managing personal finances effectively. From budgeting and saving to investing and debt management, it covers all aspects of financial planning. With advice from financial advisors and success stories of individuals who have turned their financial lives around, this guide is an invaluable resource for anyone looking to take control of their financial future.",
    author: "Kevin Lee"
  },
  {
    title: "The Future of Robotics: Trends and Innovations",
    content: "Robotics technology is advancing at an unprecedented rate, impacting various industries worldwide. This article reviews current trends and future innovations in robotics, including automation in manufacturing, healthcare, and daily life. It examines how robotics are enhancing efficiency and productivity, as well as the challenges and ethical concerns that accompany widespread robotic adoption. Interviews with engineers and thought leaders in robotics provide a glimpse into the exciting future of this technology.",
    author: "Sarah Goldberg"
  },
  {
    title: "Healthy Eating on a Budget: Nutritious and Affordable Meal Ideas",
    content: "Eating healthily does not have to be expensive. This article offers numerous tips and recipes for nutritious meals that will not break the bank. It covers everything from shopping strategies to inexpensive but healthy ingredients. With meal plans and cooking tips from nutritionists, this post is perfect for anyone looking to eat well without overspending. It demonstrates that a healthy diet can be accessible to everyone, regardless of their budget.",
    author: "Emily Turner"
  },
  {
    title: "The Benefits of Yoga for Mental and Physical Health",
    content: "Yoga has been practiced for centuries and is known for its numerous benefits to both mental and physical health. This extensive guide delves into the various types of yoga, the scientific benefits behind the practice, and how it helps reduce stress, improve flexibility, enhance concentration, and promote a balanced lifestyle. Interviews with yoga instructors and testimonials from individuals who have experienced transformational benefits underscore the importance of incorporating yoga into daily routines.",
    author: "Lisa Monroe"
  },
  {
    title: "Guide to Sustainable Travel: Exploring the World Responsibly",
    content: "As global travel resumes, sustainable travel has become a critical consideration for many. This comprehensive guide explores how travelers can minimize their environmental impact while exploring the world. From choosing eco-friendly accommodations and transportation options to supporting local economies and preserving natural habitats, this article provides practical tips and resources for responsible travel. Real-world examples and expert insights emphasize the importance of sustainable practices in tourism.",
    author: "Mark Thompson"
  },
  {
    title: "The Digital Transformation of Education: Trends and Predictions",
    content: "The education sector is undergoing significant digital transformation, influencing how educational content is delivered and consumed. This article explores the current trends in digital education, including online learning platforms, digital classrooms, and AI-driven personalized learning experiences. It discusses the challenges and opportunities presented by this shift and predicts future developments in the realm of educational technology. Insights from educators and tech experts provide a well-rounded view of the digital education landscape.",
    author: "Nancy Fields"
  },
  {
    title: "Exploring the Vegan Lifestyle: Benefits and Challenges",
    content: "Adopting a vegan lifestyle is an impactful decision for many, associated with health benefits and ethical considerations. This detailed post covers what it means to live vegan, the benefits of a plant-based diet for health and the environment, and the challenges faced by those making the transition. Comprehensive discussions with nutritionists, environmental experts, and long-time vegans offer advice and insights into making sustainable choices and navigating the challenges of dietary restrictions.",
    author: "Jessica Bridges"
  },
  {
    title: "The Art of Photography: Capturing Life Through a Lens",
    content: "Photography is a powerful form of artistic expression that captures moments and emotions in ways words cannot. This extensive guide discusses the technical aspects of photography, including camera settings, composition, and lighting, as well as the more subjective elements of capturing emotion and telling stories through images. Professional photographers share their tips and techniques, and explain how aspiring photographers can improve their craft and see the world from new perspectives.",
    author: "Tom Sanders"
  },
  {
    title: "The Role of Artificial Intelligence in Modern Warfare",
    content: "Artificial intelligence is increasingly playing a significant role in modern warfare, changing the landscape of military engagements. This article examines how AI is being integrated into defense systems, including drones, autonomous vehicles, and strategic planning tools. It discusses the ethical and practical implications of AI in warfare, as well as the potential future developments in this area. Military experts and AI researchers contribute their insights, offering a balanced perspective on the benefits and risks associated with AI in military applications.",
    author: "Gary Nolan"
  },
  {
    title: "Exploring Space: The Next Frontier in Human Discovery",
    content: "Humanity interest in space exploration continues to grow as advancements in technology make the once distant dream more attainable. This article covers the history of space exploration, recent achievements by various space agencies, and the plans for future missions to the Moon, Mars, and beyond. It discusses the challenges of space travel, the potential for human settlement on other planets, and the implications for science and humanity. Interviews with astronauts and space scientists provide a glimpse into the life of those who venture beyond our planet.",
    author: "Diane Martinez"
  },
  {
    title: "The Evolution of Social Media: From Connection to Commerce",
    content: "Social media has transformed significantly from its origins as a simple platform for connecting with friends and family to a complex ecosystem that drives global commerce and information exchange. This article analyzes the evolution of social media platforms, their impact on society and individual behavior, and the trends shaping their future. It also explores the role of social media in business, politics, and everyday life, providing insights from social media experts and users.",
    author: "Brian Foster"
  },
  {
    title: "Mindfulness and Meditation: Pathways to Inner Peace",
    content: "In an increasingly hectic world, mindfulness and meditation offer pathways to finding peace and clarity. This post explores the benefits of mindfulness practices, the different techniques of meditation, and how they can reduce stress, enhance focus, and improve overall mental health. Personal stories from individuals who have incorporated these practices into their lives, along with advice from psychologists, enrich this discussion about the transformative power of mindfulness.",
    author: "Karen Patel"
  },
  {
    title: "Blockchain Technology: The Building Blocks of a Digital Economy",
    content: "Blockchain technology is the backbone of the digital economy, powering innovations like cryptocurrencies and smart contracts. This article provides an in-depth look at how blockchain works, its applications beyond cryptocurrency, and its potential to revolutionize various industries including finance, healthcare, and logistics. The post includes expert analyses and predictions for the future of blockchain, exploring its benefits, challenges, and the ongoing developments that are shaping its role in the global economy.",
    author: "Steven Hill"
  },
  {
    title: "The Impact of Climate Change on Global Agriculture",
    content: "Climate change poses significant risks to global agriculture, affecting crop yields, water availability, and food security. This detailed examination discusses the current impacts of climate change on agriculture, adaptive strategies being employed by farmers worldwide, and the role of technology in mitigating these effects. With contributions from agricultural scientists and policy makers, the article offers a comprehensive overview of the challenges and solutions at the intersection of climate change and agriculture.",
    author: "Rebecca Moore"
  },
  {
    title: "The Psychology of Color in Marketing and Branding",
    content: "Color psychology plays a crucial role in marketing and branding, influencing consumer perceptions and behaviors. This article explores the science behind color psychology, how colors can affect emotions and decisions, and how brands use color to enhance customer engagement. Marketing experts and brand strategists share their insights on effective color strategies and real-world examples of successful color-based marketing campaigns.",
    author: "Sophia Taylor"
  },
  {
    title: "Modern Architecture: Blending Functionality with Aesthetics",
    content: "Modern architecture is not just about creating functional spaces; it is also about making aesthetic statements. This article delves into the principles of modern architecture, its evolution over the decades, and the key figures and movements that have shaped its current form. Featuring interviews with renowned architects and analyses of iconic buildings, this post offers a deep dive into the ways modern architecture influences our environments and lives.",
    author: "Leonard Schmidt"
  },
  {
    title: "The Science of Sleep: Understanding What Happens When You Sleep",
    content: "Sleep is vital to health and well-being, but what exactly happens during sleep? This article explores the science of sleep, including the different sleep stages, the role of the circadian rhythm, and how sleep affects brain function and overall health. It also provides tips for improving sleep quality and discusses common sleep disorders. Contributions from sleep researchers and health experts offer a thorough overview of why sleep matters and how to better harness its benefits.",
    author: "Megan Clarke"
  },
  {
    title: "Cybersecurity in the Digital Age: Protecting Your Digital Life",
    content: "As our lives become increasingly digitized, cybersecurity has become a critical concern. This article covers the basics of cybersecurity, common threats such as phishing and malware, and strategies for protecting personal and organizational data. Cybersecurity experts provide advice on creating strong passwords, securing digital transactions, and protecting privacy online. This guide is essential for anyone looking to understand and improve their digital security practices.",
    author: "Eric Foster"
  },
  {
    title: "Fitness Trends 2021: What is New in the World of Fitness",
    content: "The fitness industry is constantly evolving, and 2021 has seen the rise of new trends that cater to a diverse range of preferences and lifestyles. This article examines the latest fitness trends, including virtual training, wearable technology, and personalized workout regimes. It discusses the benefits of each trend and how they fit into today’s health-conscious society. Fitness experts and enthusiasts share their experiences and insights, making this a go-to resource for anyone looking to update their fitness approach.",
    author: "Olivia Martin"
  },
  {
    title: "The World of Craft Beers: Exploring Artisanal Brews",
    content: "Craft beers have garnered a dedicated following thanks to their unique flavors and brewing techniques. This article explores the world of craft beers, from the basics of craft brewing to the different styles available. It also discusses the growing community of craft beer enthusiasts and the festivals and events that celebrate this artisanal beverage. Brewers and connoisseurs contribute their knowledge and stories, providing a comprehensive guide for both newcomers and seasoned beer lovers.",
    author: "Jason Cox"
  },
  {
    title: "Investing in Real Estate: Opportunities and Risks",
    content: "Real estate investment can be a lucrative endeavor, but it comes with its set of risks and challenges. This article provides a detailed analysis of the real estate market, including the factors that influence property values, the benefits and pitfalls of investing in real estate, and strategies for successful investment. Real estate experts and investors share their experiences and advice, offering valuable insights for both novice and experienced investors looking to expand their portfolios.",
    author: "Laura Simmons"
  },
  {
    title: "The World of Indie Games: Innovations and Challenges",
    content: "The indie game industry has seen substantial growth, offering a platform for creators to innovate beyond mainstream gaming constraints. This article delves into the developments within the indie game sphere, exploring how independent developers are shaping gaming culture with their unique visions and creative gameplay mechanics. It also addresses the challenges faced by these developers, including funding and market visibility. With insights from successful indie game creators, this post offers a window into the dynamic and diverse world of independent gaming.",
    author: "Chris Redfield"
  },
  {
    title: "Personal Branding: How to Market Yourself in the Digital Age",
    content: "Personal branding has become essential in the digital age, with individuals needing to stand out in their professional and personal lives online. This extensive guide covers the fundamentals of personal branding, strategies for building a strong online presence, and tips for maintaining your digital reputation. It includes advice on leveraging social media, creating engaging content, and networking effectively. Personal branding experts provide actionable steps to help you develop and sustain a brand that resonates with your desired audience and opens up new opportunities.",
    author: "Monica Hall"
  },
  {
    title: "The Rise of Plant-Based Diets: Health Benefits and Recipes",
    content: "Plant-based diets are gaining popularity for their health and environmental benefits. This article explores the nutritional advantages of adopting a plant-based diet, including reduced risks of chronic diseases and improved overall health. It provides easy-to-follow recipes and meal ideas that cater to beginners and seasoned plant-based eaters alike. Nutritionists and dietitians offer insights into making balanced dietary choices and the article concludes with tips for transitioning to a plant-based lifestyle without compromising on taste or nutrition.",
    author: "Samantha Reed"
  },
  {
    title: "The Power of Data Science: Driving Business Innovation",
    content: "Data science is revolutionizing businesses by providing insights that drive innovation and strategic decisions. This article examines the role of data science in various industries, from healthcare to finance, and how it is used to predict trends, improve customer service, and optimize operations. It covers essential data science techniques and tools, and features interviews with industry leaders who discuss real-world applications and the future of data science in business. For anyone interested in understanding the power of data analytics, this post provides a comprehensive overview.",
    author: "Tom Holland"
  },
  {
    title: "Adventure Travel: Exploring the World Most Remote Destinations",
    content: "Adventure travel invites individuals to explore the world most remote and rugged landscapes. This article offers a guide to planning adventure travels, from trekking in the Himalayas to kayaking in the Amazon. It discusses necessary preparations, recommended gear, and safety tips. Travel experts share their most memorable experiences and advice for those looking to embark on their own adventure travels, making this a must-read for thrill-seekers and nature enthusiasts.",
    author: "Rachel Pike"
  },
  {
    title: "Understanding Blockchain: The Technology Behind Bitcoin",
    content: "Blockchain technology, the backbone of cryptocurrencies like Bitcoin, is explored in-depth in this article. It breaks down how blockchain works, its security features, and its applications beyond cryptocurrency, including in sectors like supply chain management and voting systems. The article also addresses common misconceptions and challenges associated with blockchain technology. Featuring expert commentary, this post is an essential read for anyone looking to deepen their understanding of this transformative technology.",
    author: "Daniel Smith"
  },
  {
    title: "Mental Health Awareness: Breaking the Stigma",
    content: "Mental health awareness is crucial in breaking the stigma associated with mental illness. This article discusses the importance of mental health education, common mental health disorders, and effective treatments. It highlights personal stories from individuals who have battled mental health issues and how they have navigated their journeys toward recovery. Mental health professionals contribute their expertise, offering advice on how to support those struggling and advocate for greater mental health resources.",
    author: "Emily Johnson"
  },
  {
    title: "The Art of Winemaking: Tradition Meets Modern Technology",
    content: "Winemaking is an art form that has been perfected over centuries, and this article explores how traditional techniques are being enhanced with modern technology. It covers the winemaking process from grape selection to bottling, highlighting how innovations in technology are improving the efficiency and quality of wine production. Interviews with seasoned winemakers and technologists provide insights into the evolving landscape of the wine industry and what wine enthusiasts can expect in the future.",
    author: "Robert Taylor"
  },
  {
    title: "Sustainable Fashion: Towards a More Ethical and Eco-Friendly Industry",
    content: "The fashion industry is increasingly embracing sustainability in response to environmental concerns and consumer demand for ethical practices. This article reviews the current state of sustainable fashion, including the use of eco-friendly materials, ethical labor practices, and the challenges of creating a sustainable fashion model. It features case studies of brands that are leading the way in sustainability and offers tips for consumers looking to make more responsible fashion choices.",
    author: "Nicole Brown"
  },
  {
    title: "Home Automation: Creating a Smarter Living Environment",
    content: "Home automation technology is transforming the way we live, making homes smarter and more efficient. This article explores the latest trends in home automation, including smart appliances, energy management systems, and security enhancements. It provides a guide to setting up a smart home, the benefits of home automation, and considerations for privacy and security. Tech experts and homeowners share their experiences and tips, making this an informative read for anyone interested in smart home technology.",
    author: "John Carter"
  }
];

async function insertPost(post) {
  const { title, content, author } = post;
  const insertedPost = await db.querySingle(`
    INSERT Post {
      title := '${title}',
      content := '${content}',
      author := '${author}'
    };
  `);

  const postId = insertedPost.id;
  console.log(`Inserted post with ID: ${postId}`);
  return postId;
}

async function seedData() {
  try {
    for (const post of blogPosts) {
      await insertPost(post);
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await db.close();
  }
}

seedData();
