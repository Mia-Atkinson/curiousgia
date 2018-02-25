from flask import Flask, render_template
application = Flask(__name__)

@application.route('/')

@application.route('/index')
def index():
    return render_template('/index.html', title='Curious Gia')

@application.route('/katara')
def katara():
    return render_template('/katara.html', title='Katara')

@application.route('/curious_gia')
def curious_gia():
    return render_template('/curious_gia.html', title='@curious_gia')

@application.route('/testpage')
def testpage():
    return render_template('/photo-display.html', title='Test Page')

if __name__ == '__main__':
    application.run(host='0.0.0.0')