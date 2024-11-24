
        // Sample initial messages
        let messages = [
            {
                id: 3,
                name: "Budi Pratama",
                initials: "BP",
                message: "Selamat berbahagia untuk Rama & Shinta! Semoga menjadi pasangan yang selalu berbahagia dan saling melengkapi. 🎉",
                timestamp: "1 hari yang lalu",
                color: "bg-accent"
            },
            {
                id: 2,
                name: "Siti Rahmah",
                initials: "SR",
                message: "Barakallah untuk kedua mempelai. Semoga pernikahan ini membawa keberkahan dan menjadi ladang ibadah. 💐",
                timestamp: "5 jam yang lalu",
                color: "bg-secondary"
            },
            {
                id: 1,
                name: "Ahmad Wahyudi",
                initials: "AW",
                message: "Selamat menempuh hidup baru, semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin Ya Rabbal Alamin 🙏",
                timestamp: "2 jam yang lalu",
                color: "bg-primary"
            }
        ];

        // Function to create message HTML
        function createMessageHTML(message) {
            return `
                <div class="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-gray-200 message-appear">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 rounded-full ${message.color} text-white flex items-center justify-center font-medium">
                                ${message.initials}
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center justify-between">
                                <h4 class="font-medium text-gray-900">${message.name}</h4>
                                <span class="text-sm text-gray-500">${message.timestamp}</span>
                            </div>
                            <p class="mt-1 text-gray-600">${message.message}</p>
                            <div class="mt-2 flex items-center space-x-2">
                                <span class="text-sm text-green-500">✓ Konfirmasi</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Function to render all messages
        function renderMessages() {
            const container = document.getElementById('messagesContainer');
            container.innerHTML = messages.map(message => createMessageHTML(message)).join('');
        }

        // Initial render
        renderMessages();

        // Handle form submission
        document.getElementById('rsvpForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(e.target);
            const newMessage = {
                id: messages.length + 1,
                name: formData.get('name'),
                initials: formData.get('name').split(' ').map(n => n[0]).join('').toUpperCase(),
                message: formData.get('message'),
                timestamp: 'Baru saja',
                attendees: parseInt(formData.get('guests')),
                color: 'bg-primary'
            };

            // Add new message to the beginning of the array
            messages.unshift(newMessage);

            // Re-render messages
            renderMessages();

            // Reset form
            e.target.reset();
        });

        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true
        });

        // Initialize GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Countdown Timer
        function updateCountdown() {
            const weddingDate = new Date('2024-11-30T08:00:00').getTime();
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Parallax Effect for Hero Section
        gsap.to('.hero-section', {
            backgroundPosition: '50% 100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
