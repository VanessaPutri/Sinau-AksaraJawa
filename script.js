       // Page Navigation System
        function showPage(pageName) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            // Show selected page
            const targetPage = document.getElementById('page-' + pageName);
            if (targetPage) {
                targetPage.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
        }

        // Data Aksara Dasar
        const aksaraDasar = [
            { aksara: 'ꦲ', nama: 'Ha', latin: 'ha' },
            { aksara: 'ꦤ', nama: 'Na', latin: 'na' },
            { aksara: 'ꦕ', nama: 'Ca', latin: 'ca' },
            { aksara: 'ꦫ', nama: 'Ra', latin: 'ra' },
            { aksara: 'ꦏ', nama: 'Ka', latin: 'ka' },
            { aksara: 'ꦢ', nama: 'Da', latin: 'da' },
            { aksara: 'ꦠ', nama: 'Ta', latin: 'ta' },
            { aksara: 'ꦱ', nama: 'Sa', latin: 'sa' },
            { aksara: 'ꦮ', nama: 'Wa', latin: 'wa' },
            { aksara: 'ꦭ', nama: 'La', latin: 'la' },
            { aksara: 'ꦥ', nama: 'Pa', latin: 'pa' },
            { aksara: 'ꦝ', nama: 'Dha', latin: 'dha' },
            { aksara: 'ꦗ', nama: 'Ja', latin: 'ja' },
            { aksara: 'ꦪ', nama: 'Ya', latin: 'ya' },
            { aksara: 'ꦚ', nama: 'Nya', latin: 'nya' },
            { aksara: 'ꦩ', nama: 'Ma', latin: 'ma' },
            { aksara: 'ꦒ', nama: 'Ga', latin: 'ga' },
            { aksara: 'ꦧ', nama: 'Ba', latin: 'ba' },
            { aksara: 'ꦛ', nama: 'Tha', latin: 'tha' },
            { aksara: 'ꦔ', nama: 'Nga', latin: 'nga' }
        ];

        // Render Aksara Grid
        function renderAksaraGrid() {
            const grid = document.getElementById('aksaraGrid');
            aksaraDasar.forEach(item => {
                const card = document.createElement('div');
                card.className = 'aksara-card';
                card.innerHTML = `
                    <div class="aksara-icon">${item.aksara}</div>
                    <div class="aksara-name">${item.nama}</div>
                    <div class="aksara-latin">(${item.latin})</div>
                `;
                grid.appendChild(card);
            });
        }

        // Data Soal Quiz
        const quizData = [
            {
                question: 'Aksara Jawa "ꦲ" dibaca sebagai...',
                options: ['ha', 'na', 'ca', 'ra'],
                correct: 0
            },
            {
                question: 'Urutan aksara "Hanacaraka" yang benar adalah...',
                options: ['ꦏꦫꦕꦤꦲ', 'ꦲꦤꦕꦫꦏ', 'ꦤꦲꦕꦫꦏ', 'ꦕꦫꦏꦤꦲ'],
                correct: 1
            },
            {
                question: 'Sandhangan wulu ( ꦶ ) mengubah vokal menjadi...',
                options: ['a', 'i', 'u', 'e'],
                correct: 1
            },
            {
                question: 'Kata "guru" dalam aksara Jawa ditulis...',
                options: ['ꦒꦸꦫꦸ', 'ꦒꦫꦸ', 'ꦒꦸꦫ', 'ꦒꦼꦫꦸ'],
                correct: 0
            },
            {
                question: 'Pasangan digunakan untuk...',
                options: ['Mengubah vokal', 'Menuliskan konsonan rangkap', 'Menambah konsonan akhir', 'Memisahkan kata'],
                correct: 1
            },
            {
                question: 'Sandhangan cecak ( ꦁ ) adalah konsonan akhir...',
                options: ['h', 'r', 'ng', 'n'],
                correct: 2
            },
            {
                question: 'Aksara "ꦩ" dibaca sebagai...',
                options: ['na', 'ma', 'nga', 'nya'],
                correct: 1
            },
            {
                question: 'Kata "buku" dalam aksara Jawa adalah...',
                options: ['ꦧꦸꦏ', 'ꦧꦸꦏꦸ', 'ꦧꦏꦸ', 'ꦧꦸꦏꦏꦸ'],
                correct: 1
            },
            {
                question: 'Jumlah aksara dasar dalam Hanacaraka adalah...',
                options: ['18', '20', '22', '24'],
                correct: 1
            },
            {
                question: 'Sandhangan taling ( ꦺ ) mengubah vokal menjadi...',
                options: ['i', 'u', 'é', 'o'],
                correct: 2
            }
        ];

        let currentQuestion = 0;
        let userAnswers = [];
        let score = 0;

        // Render Quiz Questions
        function renderQuiz() {
            const container = document.getElementById('quizQuestions');
            quizData.forEach((q, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'quiz-question' + (index === 0 ? ' active' : '');
                questionDiv.id = `question-${index}`;
                
                let optionsHTML = '';
                q.options.forEach((opt, optIndex) => {
                    optionsHTML += `
                        <div class="quiz-option" onclick="selectAnswer(${index}, ${optIndex})">
                            ${String.fromCharCode(65 + optIndex)}. ${opt}
                        </div>
                    `;
                });

                questionDiv.innerHTML = `
                    <div class="question-text">Soal ${index + 1} dari ${quizData.length}:</div>
                    <div class="question-text">${q.question}</div>
                    <div class="quiz-options" id="options-${index}">
                        ${optionsHTML}
                    </div>
                `;
                container.appendChild(questionDiv);
            });
        }

        function selectAnswer(questionIndex, optionIndex) {
            // Simpan jawaban
            userAnswers[questionIndex] = optionIndex;
            
            // Highlight pilihan
            const options = document.querySelectorAll(`#options-${questionIndex} .quiz-option`);
            options.forEach((opt, idx) => {
                opt.style.background = idx === optionIndex ? 'var(--coklat-terang)' : 'white';
                opt.style.color = idx === optionIndex ? 'white' : 'var(--coklat-tua)';
            });
        }

        function changeQuestion(direction) {
            const questions = document.querySelectorAll('.quiz-question');
            questions[currentQuestion].classList.remove('active');
            
            currentQuestion += direction;
            
            questions[currentQuestion].classList.add('active');
            
            // Update buttons
            document.getElementById('prevBtn').disabled = currentQuestion === 0;
            document.getElementById('nextBtn').style.display = currentQuestion === quizData.length - 1 ? 'none' : 'inline-block';
            document.getElementById('submitBtn').style.display = currentQuestion === quizData.length - 1 ? 'inline-block' : 'none';
        }

        function submitQuiz() {
            score = 0;
            const reviewContainer = document.getElementById('reviewContainer');
            reviewContainer.innerHTML = '<h3 style="margin: 2rem 0 1rem 0; color: var(--coklat-tua);">Review Jawaban:</h3>';
            
            // Hitung score dan buat review
            quizData.forEach((q, index) => {
                const options = document.querySelectorAll(`#options-${index} .quiz-option`);
                const isCorrect = userAnswers[index] === q.correct;
                
                // Highlight jawaban
                options.forEach((opt, optIndex) => {
                    if (optIndex === q.correct) {
                        opt.classList.add('correct');
                    }
                    if (userAnswers[index] === optIndex && optIndex !== q.correct) {
                        opt.classList.add('wrong');
                    }
                    opt.style.pointerEvents = 'none';
                });
                
                if (isCorrect) {
                    score++;
                }

                // Buat review item
                const reviewItem = document.createElement('div');
                reviewItem.className = 'review-item ' + (isCorrect ? 'correct' : 'wrong');
                
                let reviewHTML = `
                    <div class="review-question">Soal ${index + 1}: ${q.question}</div>
                `;

                if (userAnswers[index] !== undefined) {
                    reviewHTML += `
                        <div class="review-label">Jawaban Kamu:</div>
                        <div class="review-answer user">
                            ${String.fromCharCode(65 + userAnswers[index])}. ${q.options[userAnswers[index]]}
                            ${isCorrect ? '✓' : '✗'}
                        </div>
                    `;
                } else {
                    reviewHTML += `
                        <div class="review-label">Jawaban Kamu:</div>
                        <div class="review-answer user">
                            (Tidak dijawab) ✗
                        </div>
                    `;
                }

                if (!isCorrect) {
                    reviewHTML += `
                        <div class="review-label" style="margin-top: 0.8rem;">Jawaban Benar:</div>
                        <div class="review-answer correct-ans">
                            ${String.fromCharCode(65 + q.correct)}. ${q.options[q.correct]} ✓
                        </div>
                    `;
                }

                reviewItem.innerHTML = reviewHTML;
                reviewContainer.appendChild(reviewItem);
            });

            // Tampilkan score
            document.getElementById('scoreNumber').textContent = score;
            document.getElementById('totalQuestions').textContent = quizData.length;
            document.getElementById('scoreDisplay').classList.add('show');
            
            // Sembunyikan kontrol
            document.querySelector('.quiz-controls').style.display = 'none';
        }

        function resetQuiz() {
            currentQuestion = 0;
            userAnswers = [];
            score = 0;
            
            // Reset semua pertanyaan
            const questions = document.querySelectorAll('.quiz-question');
            questions.forEach((q, index) => {
                q.classList.remove('active');
                if (index === 0) q.classList.add('active');
                
                const options = q.querySelectorAll('.quiz-option');
                options.forEach(opt => {
                    opt.classList.remove('correct', 'wrong');
                    opt.style.background = 'white';
                    opt.style.color = 'var(--coklat-tua)';
                    opt.style.pointerEvents = 'auto';
                });
            });

            // Clear review container
            document.getElementById('reviewContainer').innerHTML = '';

            // Reset UI
            document.getElementById('scoreDisplay').classList.remove('show');
            document.querySelector('.quiz-controls').style.display = 'flex';
            document.getElementById('prevBtn').disabled = true;
            document.getElementById('nextBtn').style.display = 'inline-block';
            document.getElementById('submitBtn').style.display = 'none';
        }

        // Initialize
        window.onload = function() {
            renderAksaraGrid();
            renderQuiz();
        };