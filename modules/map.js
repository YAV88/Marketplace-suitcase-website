// ==========================================
// modules/map.js — Модуль работы с картами и адресами
// ==========================================
export const MapModule = {
    addressTimeout: null,
    
    // Безтаймерная инициализация (ResizeObserver) из прошлого шага
    initAddMap: async () => {
        if (typeof window.loadMapLibrary === 'function') await window.loadMapLibrary();
        if (typeof L === 'undefined') return;

        const mapContainer = document.getElementById('add-map');
        if (!mapContainer) return;

        if (!window.addMapObj) {
            window.addMapObj = L.map('add-map').setView(window.itemCoords || [44.8125, 20.4612], 13);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(window.addMapObj);
            window.addMarkerObj = L.marker(window.itemCoords || [44.8125, 20.4612], { draggable: true }).addTo(window.addMapObj);
            
            window.addMarkerObj.on('dragend', async () => {
                const pos = window.addMarkerObj.getLatLng();
                window.itemCoords = [pos.lat, pos.lng];
                await MapModule.reverseGeocode(pos.lat, pos.lng);
            });
            
            window.addMapObj.on('click', async (event) => {
                window.itemCoords = [event.latlng.lat, event.latlng.lng];
                window.addMarkerObj.setLatLng(window.itemCoords);
                await MapModule.reverseGeocode(window.itemCoords[0], window.itemCoords[1]);
            });
        } else {
            window.addMarkerObj.setLatLng(window.itemCoords || [44.8125, 20.4612]);
            window.addMapObj.setView(window.itemCoords || [44.8125, 20.4612], 13);
        }

        if (!window.addMapObserver) {
            window.addMapObserver = new ResizeObserver(() => {
                if (window.addMapObj && mapContainer.clientWidth > 0) window.addMapObj.invalidateSize();
            });
            window.addMapObserver.observe(mapContainer);
        }
    },

    handleAddressInput: (event) => {
        const query = event.target.value.trim();
        const suggestionsBox = document.getElementById('address-suggestions');
        
        if (query.length < 3) {
            suggestionsBox.innerHTML = ''; suggestionsBox.classList.add('hidden');
            return;
        }

        if (MapModule.addressTimeout) clearTimeout(MapModule.addressTimeout);
        MapModule.addressTimeout = setTimeout(async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=rs&addressdetails=1&limit=5`);
                const data = await response.json();
                if (data && data.length > 0) {
                    const html = data.map(place => `
                        <div class="p-3 hover:bg-brand-50 dark:hover:bg-stone-700 cursor-pointer transition-colors" data-action="select-address" data-lat="${place.lat}" data-lon="${place.lon}" data-name="${place.display_name.replace(/'/g, "\\'")}">
                            <div class="font-bold text-sm text-stone-800 dark:text-white truncate flex items-center gap-2">
                                <i class="fa-solid fa-location-dot text-brand-500 opacity-70"></i> ${place.display_name.split(',')[0]}
                            </div>
                            <div class="text-xs text-stone-500 truncate pl-5 mt-0.5">${place.display_name}</div>
                        </div>
                    `).join('');
                    suggestionsBox.innerHTML = html;
                    suggestionsBox.classList.remove('hidden');
                } else {
                    suggestionsBox.classList.add('hidden');
                }
            } catch (e) { console.error("Ошибка API карт:", e); }
        }, 400);
    },

    selectAddress: (lat, lon, displayName) => {
        const input = document.getElementById('item-address');
        const suggestionsBox = document.getElementById('address-suggestions');
        const parts = displayName.split(',');
        input.value = parts.slice(0, 3).join(',').trim();
        suggestionsBox.classList.add('hidden');
        window.itemCoords = [parseFloat(lat), parseFloat(lon)];

        if (window.addMapObj && window.addMarkerObj) {
            window.addMapObj.setView(window.itemCoords, 16);
            window.addMarkerObj.setLatLng(window.itemCoords);
        }
    },

    reverseGeocode: async (lat, lon) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await response.json();
            if (data && data.display_name) {
                const input = document.getElementById('item-address');
                const parts = data.display_name.split(',');
                input.value = parts.slice(0, 3).join(',').trim();
            }
        } catch (e) { console.error(e); }
    }
};