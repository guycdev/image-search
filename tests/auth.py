import unittest
import os
import time
import logging
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from dotenv import load_dotenv


load_dotenv()


class AuthTests(unittest.TestCase):
    def setUp(self):
        self.options = Options()
        self.options.add_argument("--headless")
        self.driver = webdriver.Chrome(options=self.options)
        self.url = "http://localhost:3000/explore"
        self.username = os.getenv("PYTHON_TEST_USERNAME")
        self.password = os.getenv("PYTHON_TEST_PASSWORD")
        self.userId = os.getenv("PYTHON_USER_ID")

    def test_auth(self):
        driver = self.driver
        driver.get(self.url)
        github_button = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located(
                (By.CLASS_NAME, "cl-socialButtonsIconButton__github"))
        )
        github_button.click()
        github_username_container = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.ID, "login_field"))
        )
        github_password_container = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.ID, "password"))
        )
        github_username_container.send_keys(self.username)
        github_password_container.send_keys(self.password)
        login_btn = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.NAME, "commit"))
        )
        time.sleep(2)
        login_btn.click()
        auth_btn = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located(
                (By.CLASS_NAME, "js-oauth-authorize-btn"))
        )
        time.sleep(2)
        auth_btn.click()
        text_element = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located(
                (By.XPATH, f"//p[contains(text(), '{self.userId}')]"))
        )
        self.assertIsNotNone(text_element)


if __name__ == "__main__":
    unittest.main()
