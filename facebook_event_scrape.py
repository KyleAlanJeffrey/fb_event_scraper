from seleniumwire import webdriver  # Import from seleniumwire
import brotli

import datetime
import json
import time


if __name__ == "__main__":
    options = webdriver.ChromeOptions()
    options.add_argument("headless")

    chrome_driver = webdriver.Chrome()

    today = datetime.date.today()
    url = f"https://www.facebook.com/events/?date_filter_option=TODAY&discover_tab=CUSTOM&end_date={today}T07%3A00%3A00.000Z&location_id=114952118516947&start_date={today}%3A00%3A00.000Z"

    chrome_driver.get(url)

    # Scroll until the document doesnt grow
    page_height = chrome_driver.execute_script("return document.body.scrollHeight")
    prev_page_height = 0
    while page_height != prev_page_height:
        chrome_driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1.5)
        prev_page_height = page_height
        page_height = chrome_driver.execute_script("return document.body.scrollHeight")

    events = []
    for request in chrome_driver.requests:
        if request.url == "https://www.facebook.com/api/graphql/":
            response = request.response
            encoding = response.headers.get("Content-Encoding", "identity")
            body = json.loads(brotli.decompress(response.body).decode())
            more_events = body["data"]["viewer"]["suggested_events"]["events"]["edges"]
            events += more_events

    # Remove events not today

    events = list(
        filter(
            lambda event: datetime.datetime.fromtimestamp(
                event["node"]["start_timestamp"]
            ).date()
            == today,
            events,
        )
    )

    # Parse popularity
    for event in events:
        popularity = event["node"]["social_context"]["text"]
        elems = popularity.split(" ")
        nums = []
        for elem in elems:
            if elem.isnumeric():
                nums.append(int(elem))
        if "interested" in popularity and "going" in popularity:
            event["node"]["interested"] = nums[0]
            event["node"]["going"] = nums[1]
        elif "interested" in popularity and "going" not in popularity:
            event["node"]["interested"] = nums[0]
            event["node"]["going"] = 0
        elif "interested" not in popularity and "going" in popularity:
            event["node"]["interested"] = 0
            event["node"]["going"] = nums[0]
        else:
            event["node"]["interested"] = 0
            event["node"]["going"] = 0

    events = sorted(
        events,
        key=lambda event: event["node"]["interested"] + event["node"]["going"],
        reverse=True,
    )
    with open("data.json", "w") as f:
        json.dump(events, f)
