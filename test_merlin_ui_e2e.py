import unittest
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class MerlinUITest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--headless')  # Opcional
        cls.driver = webdriver.Remote(
            command_executor='http://127.0.0.1:4444/wd/hub',
            options=chrome_options
        )
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()
        cls.base_url = "http://127.0.0.1:3000"
        cls.wait = WebDriverWait(cls.driver, 12)
        os.makedirs("screenshots", exist_ok=True)

    def save_screenshot_on_failure(self, test_name):
        self.driver.save_screenshot(f"screenshots/{test_name}.png")

    def test_modelo_page(self):
        try:
            self.driver.get(f"{self.base_url}/dashboards/modelo")

            self.wait.until(EC.presence_of_element_located((By.XPATH, "//h3[contains(text(),'Modelo')]")))

            # Usamos lambda para evitar StaleElementReference
            dnn_button = self.wait.until(lambda d: d.find_element(By.XPATH, "//button[contains(text(),'Modelo DNN')]"))
            dnn_button.click()

            self.wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'CTR promedio')]")))
        except Exception as e:
            self.driver.save_screenshot("screenshots/error_modelo_page.png")
            print("[ERROR EN MODELO PAGE]")
            print(self.driver.page_source[:1000])
            raise e


    def test_historial_page(self):
        try:
            self.driver.get(f"{self.base_url}/dashboards/historial")

            # Espera que aparezca el texto del título
            self.wait.until(EC.presence_of_element_located(
                (By.XPATH, "//*[contains(text(),'Historial de Predicciones')]")
            ))

            # Espera que aparezcan filas de tabla basadas en divs con role="row"
            rows = self.wait.until(EC.presence_of_all_elements_located(
                (By.XPATH, "//div[@role='row' and contains(@class, 'rdt_TableRow')]")
            ))

            assert len(rows) > 0
            print(f"✅ Se encontraron {len(rows)} filas en la tabla.")

        except Exception as e:
            self.driver.save_screenshot("error_historial_page.png")
            print("[ERROR EN HISTORIAL PAGE]")
            print(self.driver.page_source[:1000])
            raise e


    def test_merlin_interaction(self):
        try:
            self.driver.get(f"{self.base_url}/merlinCatalogos")
            self.wait.until(EC.presence_of_element_located((By.XPATH, "//h1[contains(text(),'¿Con qué puedo ayudarte?')]")))
            prompt_button = self.driver.find_element(By.XPATH, "//button[contains(text(),'Productos Dia del padre')]")
            prompt_button.click()
            self.wait.until(EC.presence_of_element_located((By.CLASS_NAME, "rounded-lg")))
            assert "Producto" in self.driver.page_source
        except Exception as e:
            self.save_screenshot_on_failure("test_merlin_interaction")
            raise e

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
    
    def test_title(self):
        self.driver.get("http://127.0.0.1:3000")
        self.assertIn("Merlin", self.driver.title)


if __name__ == "__main__":
    unittest.main()
