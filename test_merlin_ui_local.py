# test_merlin_ui_local.py

import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class MerlinUILocalTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument("--start-maximized")

        # Usar ChromeDriver instalado automáticamente
        cls.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        cls.base_url = "http://localhost:3000"

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_title(self):
        self.driver.get(f"{self.base_url}/")
        WebDriverWait(self.driver, 10).until(lambda d: d.title != "")
        self.assertIn("Merlin", self.driver.title)

    def test_modelo_page(self):
        try:
            self.driver.get(f"{self.base_url}/dashboards/modelo")
            time.sleep(2)
            self.assertIn("Modelo", self.driver.page_source)
        except Exception as e:
            print("[ERROR EN MODELO PAGE]")
            print(self.driver.page_source)
            raise e

    def test_historial_page(self):
        try:
            self.driver.get(f"{self.base_url}/dashboards/historial")
            time.sleep(2)
            self.assertIn("Historial", self.driver.page_source)
        except Exception as e:
            print("[ERROR EN HISTORIAL PAGE]")
            print(self.driver.page_source)
            raise e

    def test_merlin_interaction(self):
        try:
            self.driver.get(f"{self.base_url}/merlinCatalogos")
            time.sleep(2)
            self.assertIn("Catálogo", self.driver.page_source)
        except Exception as e:
            print("[ERROR EN INTERACCIÓN MERLIN]")
            print(self.driver.page_source)
            raise e

if __name__ == "__main__":
    unittest.main()
