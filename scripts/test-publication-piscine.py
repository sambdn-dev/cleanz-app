"""Parcours navigateur après build/start : python3 scripts/test-publication-piscine.py.
Prérequis : Playwright Python + Chromium. CLEANZ_TEST_URL change l’URL locale.
"""
import os
import re
from playwright.sync_api import sync_playwright, expect

base_url = os.environ.get('CLEANZ_TEST_URL', 'http://127.0.0.1:3000')
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        executable_path=os.environ.get('CLEANZ_CHROMIUM_PATH', '/usr/bin/chromium'),
        headless=True,
        args=['--no-sandbox'],
    )
    page = browser.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=1)
    page.add_init_script("""
        localStorage.setItem('cleanz-seen-nouveautes', '999999');
        localStorage.setItem('pwa-prompt-dismissed', 'true');
    """)
    page.goto(base_url, wait_until='domcontentloaded')
    page.get_by_role('button', name=re.compile('Piscine & Spa')).click()
    guide = page.locator('#piscine-spa')
    expect(guide).to_be_visible()

    guide.get_by_role('button', name='Nettoyer la ligne d’eau', exact=False).click()
    expect(guide.get_by_text('Cette méthode est en cours de revue.', exact=False)).to_be_visible()
    expect(guide.get_by_role('button', name='Consulter la fiche')).to_have_count(0)
    assert not re.search('pierre|bicarbonate|vinaigre|sans chimie', guide.inner_text(), re.IGNORECASE)
    print('PASS : ligne d’eau #143 bloquée, sans recette parallèle ni préparation.')

    guide.get_by_role('button', name='Spa', exact=True).click()
    guide.get_by_role('button', name='Entretenir le filtre', exact=False).click()
    expect(guide.get_by_text('Cette méthode est en cours de revue.', exact=False)).to_be_visible()
    expect(guide.get_by_role('button', name='Consulter la fiche')).to_have_count(0)
    assert not re.search('vinaigre|trempe|1×/mois|1×/an', guide.inner_text(), re.IGNORECASE)
    print('PASS : filtre #144 bloqué, sans bain ni calendrier de préparation parallèle.')

    guide.get_by_role('button', name='SOS', exact=True).click()
    for title in ['Eau verte (algues)', 'Eau trouble ou laiteuse', 'Forte odeur de chlore', 'Dépôts marron sur les parois']:
        accordion = guide.get_by_role('button', name=title, exact=False)
        if accordion.get_attribute('aria-expanded') != 'true':
            accordion.click()
        text = guide.inner_text()
        assert 'publiée n’est disponible ici' in text
        assert not re.search('traitement choc|floculant|séquestrant|7,0|48 h|24h/24', text, re.IGNORECASE)
    print('PASS : quatre traitements SOS non enregistrés remplacés par des notices.')
    browser.close()
