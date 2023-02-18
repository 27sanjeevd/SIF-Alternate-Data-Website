import requests
from bs4 import BeautifulSoup

def find_careers_page(url):
    # Get the company's main page HTML content
    response = requests.get(url)
    main_page = BeautifulSoup(response.content, "html.parser")

    # Find the link to the careers page
    careers_link = main_page.find("a", text="Career")["href"]

    # Get the careers page HTML content
    response = requests.get(careers_link)
    careers_page = BeautifulSoup(response.content, "html.parser")

    return careers_page

def get_roles(careers_page):
    # Find the elements containing job titles
    job_titles = careers_page.find_all("h3", {"class": "job-title"})

    # Extract the job titles and return as a list
    return [title.text for title in job_titles]

# Example usage:
company_url = "http://apple.com"
careers_page = find_careers_page(company_url)
roles = get_roles(careers_page)

print("Roles:")
for role in roles:
    print(role)
