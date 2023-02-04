JSON

```json
"services": [
    {
    "name": "Frontend Mentor",
    "svgSource": "/svgs/frontendmentor.svg",
    "svgAltText": "Frontend Mentor Logo",
    "description": "Collection of challenges I completed for Frontend Mentor",
    "cssClass": "",
    "difficulty": [
        {
            "title": "Junior",
            "cssClass": "frontEndMentorChallenges",
            "challenges": [
                {
                    "title": "Advice Generator App",
                    "url": "/FrontendMentor/junior/advice-generator-app/",
                    "description": "",
                    "techUsed": [
                        "html5",
                        "css3",
                        "js"
                    ],
                    "screenshotURL": "/FrontendMentor/junior/advice-generator-app/screenshots/mobile.png",
                    "screenshotAltText": "Advice Generator App"
                }
            ]
        },
```
RAW Liquid

{% raw %}
```liquid
{% assign navigation = site.data.navigation[include.nav] %}

<nav class="nav__list">
  {% if page.sidebar.title %}<h3 class="nav__title" style="padding-left: 0;">{{ page.sidebar.title }}</h3>{% endif %}
  <input id="ac-toc" name="accordion-toc" type="checkbox" />
  <label for="ac-toc">{{ ui-text[site.locale].menu_label | default: "Toggle Menu" }}</label>
  <ul class="nav__items">
    {% for nav in navigation %}
      <li>
        {% if nav.url %}
          <a href="{{ nav.url | relative_url }}"><span class="nav__sub-title">{{ nav.title }}</span></a>
        {% else %}
          <span class="nav__sub-title">{{ nav.title }}</span>
        {% endif %}

        {% if nav.children != null %}
        <ul>
          {% for child in nav.children %}
            <li><a href="{{ child.url | relative_url }}"{% if child.url == page.url %} class="active"{% endif %}>{{ child.title }}</a></li>
          {% endfor %}
        </ul>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
</nav>
```
{% endraw %}

RAW - NJK

{% raw %}
```njk
{# {% set projectPrefix = project %} #}

{% if projectContent %}
    <div class="project-card stacked">
        <a href="{{projectContent.url}}">
            <img loading="lazy" class="card__img" src="{{projectContent.screenshotURL}}"
                        alt="{{projectContent.screenshotAltText}}"/>
        </a>
        <div class="card__content">
            <h3 class="card__title">
                {{projectContent.title}}
            </h3>
            {% if projectContent.description | length %}
                <p class="card__description">
                    {{projectContent.description}}
                </p>
            {% endif %}
            <ul class="card__techUsed">
                {% for tech in projectContent.techUsed %}
                    {% if tech === "html5" %}
                        <li>
                            <img src="/svgs/html5.svg" alt="HTML5"/>
                        </li>
                    {% endif %}
                    {% if tech === "css3" %}
                        <li>
                            <img src="/svgs/css3.svg" alt="CSS3"/>
                        </li>
                    {% endif %}
                    {% if tech === "js" %}
                        <li>
                            <img src="/svgs/javascript.svg" alt="JavaScript"/>
                        </li>
                    {% endif %}
                {% endfor %}
            </ul>
        </div>
    </div>
{% endif %}
```
{% endraw %}

The finished build is then copied and published.

None

```text
name: Build Eleventy

on:
    push:
        branches:
            - main

jobs:
    build:
        runs-on: ubuntu-latest

        strategy:
            matrix:
                node-version: [17.x]

        steps:
            - uses: actions/checkout@v2

            - name: Use Node.js ${{ matrix.node-version }}
              uses: actions/setup-node@v2
              with:
                  node-version: ${{ matrix.node-version }}

            - name: Install dependencies & build
              run: |
                  npm ci
                  npm run build

            - name: Deploy
              uses: peaceiris/actions-gh-pages@v3.7.3
              with:
                  publish_dir: ./www
                  github_token: ${{ secrets.GITHUB_TOKEN }}
```

NJK


{% raw %}

```njk
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>
            {{ title }} - {{ site.url }}
        </title>
        {% include "global/site-meta.njk" %}
        {% include "global/site-css.njk" %}
        {% include "global/site-favicon.njk" %}
    </head>
    <body>
        {% include "global/site-header.njk" %}
        {% include "global/site-main.njk" %}
        {% include "global/site-footer.njk" %}
    </body>
</html>
```
{% endraw %}
