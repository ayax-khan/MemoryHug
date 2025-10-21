// State Management
const state = {
    childPhoto: null,
    currentPhoto: null,
    generatedImage: null,
    isGenerating: false,
    settings: {
        style: 'classic',
        blend: 50,
        opacity: 100,
        background: 'original',
        lightMatch: true
    }
};

// API Configuration (update with your backend URL)
const API_BASE_URL = 'https://zeroday-00-past-present-backend.hf.space'; // Live FastAPI backend

// DOM Elements
const elements = {
    // Upload zones
    dropZone1: document.getElementById('dropZone1'),
    dropZone2: document.getElementById('dropZone2'),
    childPhoto: document.getElementById('childPhoto'),
    currentPhoto: document.getElementById('currentPhoto'),
    
    // Previews
    preview1: document.getElementById('preview1'),
    preview2: document.getElementById('preview2'),
    
    // Controls
    generateBtn: document.getElementById('generateBtn'),
    styleSelect: document.getElementById('styleSelect'),
    blendSlider: document.getElementById('blendSlider'),
    blendValue: document.getElementById('blendValue'),
    opacitySlider: document.getElementById('opacitySlider'),
    opacityValue: document.getElementById('opacityValue'),
    backgroundSelect: document.getElementById('backgroundSelect'),
    lightMatch: document.getElementById('lightMatch'),
    advancedToggle: document.getElementById('advancedToggle'),
    advancedPanel: document.getElementById('advancedPanel'),
    
    // Result
    resultEmpty: document.getElementById('resultEmpty'),
    resultContent: document.getElementById('resultContent'),
    mergedImage: document.getElementById('mergedImage'),
    beforeImage: document.getElementById('beforeImage'),
    afterImage: document.getElementById('afterImage'),
    
    // Actions
    downloadBtn: document.getElementById('downloadBtn'),
    shareBtn: document.getElementById('shareBtn'),
    retryBtn: document.getElementById('retryBtn'),
    captionInput: document.getElementById('captionInput'),
    
    // Modal
    progressModal: document.getElementById('progressModal'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastIcon: document.getElementById('toastIcon'),
    toastMessage: document.getElementById('toastMessage'),
    
    // Comparison slider
    comparisonSlider: document.getElementById('comparisonSlider'),
    toggleSlider: document.getElementById('toggleSlider'),
    sliderHandle: document.getElementById('sliderHandle'),
    sliderOverlay: document.getElementById('sliderOverlay')
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeUploadHandlers();
    initializeControlHandlers();
    initializeResultHandlers();
    initializeComparisonSlider();
});

// ============ UPLOAD HANDLERS ============

function initializeUploadHandlers() {
    // File input change handlers
    elements.childPhoto.addEventListener('change', (e) => handleFileSelect(e, 'child'));
    elements.currentPhoto.addEventListener('change', (e) => handleFileSelect(e, 'current'));
    
    // Drag and drop for zone 1
    setupDragAndDrop(elements.dropZone1, elements.childPhoto, 'child');
    
    // Drag and drop for zone 2
    setupDragAndDrop(elements.dropZone2, elements.currentPhoto, 'current');
    
    // Remove buttons
    document.getElementById('remove1').addEventListener('click', () => removePhoto('child'));
    document.getElementById('remove2').addEventListener('click', () => removePhoto('current'));
    
    // Crop buttons (placeholder - would integrate with image crop library)
    document.getElementById('crop1').addEventListener('click', () => showToast('Crop feature coming soon!', 'warning'));
    document.getElementById('crop2').addEventListener('click', () => showToast('Crop feature coming soon!', 'warning'));
    
    // Keyboard navigation for upload zones
    elements.dropZone1.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            elements.childPhoto.click();
        }
    });
    
    elements.dropZone2.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            elements.currentPhoto.click();
        }
    });
}

function setupDragAndDrop(dropZone, fileInput, type) {
    // Click on drop zone to trigger file input
    dropZone.addEventListener('click', (e) => {
        // Prevent if clicking on the actual file input
        if (e.target !== fileInput) {
            fileInput.click();
        }
    });
    
    // Drag over
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    // Drag leave
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    
    // Drop
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0], type);
        }
    });
}

function handleFileSelect(event, type) {
    const file = event.target.files[0];
    if (file) {
        handleFile(file, type);
    }
}

function handleFile(file, type) {
    // Validate file
    if (!file.type.match('image/(png|jpeg|jpg)')) {
        showToast('Please upload a PNG or JPG image', 'error');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        showToast('File size must be less than 10MB', 'error');
        return;
    }
    
    // Read and preview file
    const reader = new FileReader();
    reader.onload = (e) => {
        if (type === 'child') {
            state.childPhoto = { file, dataUrl: e.target.result };
            showPreview(e.target.result, 'preview1', 'dropZone1');
        } else {
            state.currentPhoto = { file, dataUrl: e.target.result };
            showPreview(e.target.result, 'preview2', 'dropZone2');
        }
        
        updateGenerateButton();
    };
    
    reader.readAsDataURL(file);
}

function showPreview(dataUrl, previewId, dropZoneId) {
    const preview = document.getElementById(previewId);
    const dropZone = document.getElementById(dropZoneId);
    const img = preview.querySelector('.preview-image');
    
    img.src = dataUrl;
    dropZone.style.display = 'none';
    preview.style.display = 'block';
}

function removePhoto(type) {
    if (type === 'child') {
        state.childPhoto = null;
        document.getElementById('preview1').style.display = 'none';
        document.getElementById('dropZone1').style.display = 'flex';
        elements.childPhoto.value = '';
    } else {
        state.currentPhoto = null;
        document.getElementById('preview2').style.display = 'none';
        document.getElementById('dropZone2').style.display = 'flex';
        elements.currentPhoto.value = '';
    }
    
    updateGenerateButton();
}

function updateGenerateButton() {
    const isReady = state.childPhoto && state.currentPhoto;
    elements.generateBtn.disabled = !isReady || state.isGenerating;
}

// ============ CONTROL HANDLERS ============

function initializeControlHandlers() {
    // Style selector
    elements.styleSelect.addEventListener('change', (e) => {
        state.settings.style = e.target.value;
    });
    
    // Blend slider
    elements.blendSlider.addEventListener('input', (e) => {
        state.settings.blend = parseInt(e.target.value);
        elements.blendValue.textContent = e.target.value;
    });
    
    // Opacity slider
    elements.opacitySlider.addEventListener('input', (e) => {
        state.settings.opacity = parseInt(e.target.value);
        elements.opacityValue.textContent = e.target.value;
    });
    
    // Background selector
    elements.backgroundSelect.addEventListener('change', (e) => {
        state.settings.background = e.target.value;
    });
    
    // Light match checkbox
    elements.lightMatch.addEventListener('change', (e) => {
        state.settings.lightMatch = e.target.checked;
    });
    
    // Advanced toggle
    elements.advancedToggle.addEventListener('click', () => {
        const isExpanded = elements.advancedToggle.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            elements.advancedToggle.setAttribute('aria-expanded', 'false');
            elements.advancedPanel.style.display = 'none';
        } else {
            elements.advancedToggle.setAttribute('aria-expanded', 'true');
            elements.advancedPanel.style.display = 'block';
        }
    });
    
    // Generate button
    elements.generateBtn.addEventListener('click', generateImage);
}

// ============ API INTEGRATION ============

async function generateImage() {
    if (!state.childPhoto || !state.currentPhoto || state.isGenerating) {
        return;
    }
    
    state.isGenerating = true;
    updateGenerateButton();
    
    // Show progress modal
    showProgressModal();
    
    try {
        // Prepare form data
        const formData = new FormData();
        formData.append('childhood_photo', state.childPhoto.file);
        formData.append('current_photo', state.currentPhoto.file);
        formData.append('style', state.settings.style);
        formData.append('blend', state.settings.blend);
        formData.append('opacity', state.settings.opacity);
        formData.append('background', state.settings.background);
        formData.append('light_match', state.settings.lightMatch);
        
        // Simulate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90;
            updateProgress(progress, getProgressMessage(progress));
        }, 500);
        
        // Call API
        const response = await fetch(`${API_BASE_URL}/api/generate`, {
            method: 'POST',
            body: formData
        });
        
        clearInterval(progressInterval);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to generate image');
        }
        
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        
        // Update state
        state.generatedImage = imageUrl;
        
        // Complete progress
        updateProgress(100, 'Complete!');
        
        setTimeout(() => {
            hideProgressModal();
            showResult(imageUrl);
            showToast('Your memory has been created!', 'success');
        }, 500);
        
    } catch (error) {
        console.error('Generation error:', error);
        hideProgressModal();
        showToast(error.message || 'Failed to generate image. Please try again.', 'error');
    } finally {
        state.isGenerating = false;
        updateGenerateButton();
    }
}

function getProgressMessage(progress) {
    if (progress < 20) return 'Uploading images...';
    if (progress < 40) return 'Analyzing photos...';
    if (progress < 60) return 'Detecting faces...';
    if (progress < 80) return 'Merging images...';
    if (progress < 95) return 'Adding final touches...';
    return 'Almost done...';
}

function showProgressModal() {
    elements.progressModal.style.display = 'flex';
    updateProgress(0, 'Starting...');
}

function hideProgressModal() {
    elements.progressModal.style.display = 'none';
}

function updateProgress(percent, message) {
    elements.progressFill.style.width = `${percent}%`;
    elements.progressText.textContent = message;
}

// ============ RESULT HANDLERS ============

function initializeResultHandlers() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Action buttons
    elements.downloadBtn.addEventListener('click', downloadImage);
    elements.shareBtn.addEventListener('click', shareImage);
    elements.retryBtn.addEventListener('click', retryGeneration);
    
    // Toggle comparison slider
    elements.toggleSlider.addEventListener('click', toggleComparisonSlider);
}

function showResult(imageUrl) {
    // Hide empty state
    elements.resultEmpty.style.display = 'none';
    elements.resultContent.style.display = 'block';
    
    // Set images
    elements.mergedImage.src = imageUrl;
    elements.beforeImage.src = state.childPhoto.dataUrl;
    elements.afterImage.src = state.currentPhoto.dataUrl;
    
    // Setup comparison slider
    document.querySelector('.slider-before').src = state.childPhoto.dataUrl;
    document.querySelector('.slider-after').src = state.currentPhoto.dataUrl;
    
    // Switch to merged tab
    switchTab('merged');
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add('active');
}

function downloadImage() {
    if (!state.generatedImage) {
        showToast('No image to download', 'warning');
        return;
    }
    
    const link = document.createElement('a');
    link.href = state.generatedImage;
    link.download = `past-present-memory-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Image downloaded successfully!', 'success');
}

async function shareImage() {
    const caption = elements.captionInput.value || 'Check out my Past + Present memory!';
    
    try {
        if (navigator.share && state.generatedImage) {
            // Convert blob URL to blob
            const response = await fetch(state.generatedImage);
            const blob = await response.blob();
            const file = new File([blob], 'memory.png', { type: 'image/png' });
            
            await navigator.share({
                title: 'Past + Present Memory',
                text: caption,
                files: [file]
            });
            
            showToast('Shared successfully!', 'success');
        } else {
            // Fallback: copy link
            await navigator.clipboard.writeText(window.location.href);
            showToast('Link copied to clipboard!', 'success');
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Share error:', error);
            showToast('Unable to share. Please try downloading instead.', 'error');
        }
    }
}

function retryGeneration() {
    if (state.childPhoto && state.currentPhoto) {
        generateImage();
    } else {
        showToast('Please upload both photos first', 'warning');
    }
}

// ============ COMPARISON SLIDER ============

function initializeComparisonSlider() {
    let isDragging = false;
    
    elements.sliderHandle.addEventListener('mousedown', startDrag);
    elements.sliderHandle.addEventListener('touchstart', startDrag);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    
    function startDrag(e) {
        isDragging = true;
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const container = elements.comparisonSlider.querySelector('.slider-container');
        const rect = container.getBoundingClientRect();
        const x = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        elements.sliderOverlay.style.width = `${percent}%`;
        elements.sliderHandle.style.left = `${percent}%`;
    }
    
    function stopDrag() {
        isDragging = false;
    }
}

function toggleComparisonSlider() {
    const isVisible = elements.comparisonSlider.style.display !== 'none';
    
    if (isVisible) {
        elements.comparisonSlider.style.display = 'none';
        elements.toggleSlider.textContent = 'Compare';
    } else {
        elements.comparisonSlider.style.display = 'block';
        elements.toggleSlider.textContent = 'Hide';
    }
}

// ============ NOTIFICATION SYSTEM ============

function showToast(message, type = 'success') {
    elements.toast.className = `toast ${type}`;
    elements.toastMessage.textContent = message;
    elements.toast.style.display = 'flex';
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        elements.toast.style.display = 'none';
    }, 4000);
}

// ============ UTILITY FUNCTIONS ============

// Handle window resize for responsive behavior
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reset comparison slider position on resize
        if (elements.comparisonSlider.style.display !== 'none') {
            elements.sliderOverlay.style.width = '50%';
            elements.sliderHandle.style.left = '50%';
        }
    }, 250);
});

// Cleanup blob URLs when leaving page
window.addEventListener('beforeunload', () => {
    if (state.generatedImage) {
        URL.revokeObjectURL(state.generatedImage);
    }
});

// Error boundary for uncaught errors
window.addEventListener('error', (e) => {
    console.error('Uncaught error:', e.error);
    showToast('An unexpected error occurred', 'error');
});

// Service worker registration (optional - for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
    });
}

console.log('Past + Present Studio initialized ✨');
