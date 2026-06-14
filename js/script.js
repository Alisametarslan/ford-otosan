// ===============================================
// FORD OTOSAN - WEB TASARIMI DERSI PROJESİ
// JavaScript Etkileşimleri
// ===============================================

// 1. MOBİL MENÜ AÇ/KAPAT (Yönerge madde 8)
// ===============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Menü açıldığında body'ye scroll engelle
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}

// Menü dışında tıklama yapıldığında menüyü kapat
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// 2. SEKMELİ İÇERİK (Hizmetler sayfasında)
// ===============================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Tüm butonlardan active kaldır
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Tüm içerikleri gizle
            tabContents.forEach(content => content.classList.remove('active'));
            
            // İlgili içeriği göster
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
                activeTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// 3. İLETİŞİM FORMU KONTROLÜ (Yönerge madde 5 ve 8)
// ===============================================
const form = document.getElementById('iletisimForm');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form elemanlarını al
        const adsoyad = document.getElementById('adsoyad');
        const mesaj = document.getElementById('mesaj');
        const formMesaji = document.getElementById('formMesaji');
        
        // Boş alan kontrolü
        if (adsoyad.value.trim() === '' || mesaj.value.trim() === '') {
            formMesaji.classList.add('show');
            formMesaji.style.color = 'red';
            formMesaji.style.backgroundColor = '#ffebee';
            formMesaji.textContent = '⚠️ Lütfen ad soyad ve mesaj alanlarını doldurun.';
            
            // 5 saniye sonra uyarı mesajını gizle
            setTimeout(() => {
                formMesaji.classList.remove('show');
            }, 5000);
            
            return false;
        }
        
        // Form başarılı gönderildiyse
        formMesaji.classList.add('show');
        formMesaji.style.color = 'green';
        formMesaji.style.backgroundColor = '#e8f5e9';
        formMesaji.textContent = '✓ Mesajınız alınmıştır! (Bu bir eğitim projesiyiz)';
        
        // Formu temizle
        form.reset();
        
        // 5 saniye sonra başarı mesajını gizle
        setTimeout(() => {
            formMesaji.classList.remove('show');
        }, 5000);
    });
    
    // Geçerli olmayan form alanlarını kaldır
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            document.getElementById('formMesaji').classList.remove('show');
        });
    });
}

// 4. AKTİF SAYFA MENÜ ÖĞESİNİ VURGULA
// ===============================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// 5. SAYFAYA DÖNÜŞ BUTONU
// ===============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (!document.getElementById('scrollToTopBtn')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.id = 'scrollToTopBtn';
            scrollBtn.innerHTML = '↑';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #002a5e;
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 24px;
                z-index: 998;
                transition: opacity 0.3s, background 0.3s;
                opacity: 0.8;
            `;
            
            scrollBtn.addEventListener('mouseover', () => {
                scrollBtn.style.background = '#ffcc00';
                scrollBtn.style.color = '#002a5e';
            });
            
            scrollBtn.addEventListener('mouseout', () => {
                scrollBtn.style.background = '#002a5e';
                scrollBtn.style.color = 'white';
            });
            
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            document.body.appendChild(scrollBtn);
        }
    } else {
        const btn = document.getElementById('scrollToTopBtn');
        if (btn) btn.remove();
    }
});

// 6. SAYFA YÜKLENDİĞİNDE UYARI
// ===============================================
window.addEventListener('load', () => {
    console.log('Ford Otosan Web Sitesi yüklendi - Web Tasarımı Dersi Projesi');
});