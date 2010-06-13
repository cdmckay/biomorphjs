<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="user-scalable=no" />
        <title>Biomorph.js</title>
        <link rel="stylesheet" href="css/style.css" />        
        <script type="text/javascript" src="js/lib/jquery.js"></script>
        <script type="text/javascript" src="js/lib/jquery.color.js"></script>
        <script type="text/javascript" src="js/lib/object.js"></script>
        <script type="text/javascript" src="js/lib/math.js"></script>
        <script type="text/javascript" src="js/lib/number.js"></script>
        <script type="text/javascript" src="js/lib/array.js"></script>
        <script type="text/javascript" src="js/gene.js"></script>
        <script type="text/javascript" src="js/biomorph.js"></script>
    </head>
    <body>
        <div id="body">
            <div id="menu">
                <div class="right-arrow"></div>
                <div class="right-arrow"></div>
                <div class="right-arrow"></div>
                <div class="left-arrow"></div>
                <div class="left-arrow"></div>
                <div class="left-arrow"></div>
            </div>
            <div id="bottom-menu">
                Shift-click to store a Biomorph.
            </div>
            <div id="window">
                <div class="cell"><canvas id="cell-1" width="150" height="150"></canvas></div>
                <div class="cell"><canvas id="cell-2" width="150" height="150"></canvas></div>
                <div class="cell"><canvas id="cell-3" width="150" height="150"></canvas></div>

                <div class="cell"><canvas id="cell-4" width="150" height="150"></canvas></div>
                <div class="cell parent"><canvas id="cell-0" width="150" height="150"></canvas></div>
                <div class="cell"><canvas id="cell-5" width="150" height="150"></canvas></div>

                <div class="cell"><canvas id="cell-6" width="150" height="150"></canvas></div>
                <div class="cell"><canvas id="cell-7" width="150" height="150"></canvas></div>
                <div class="cell"><canvas id="cell-8" width="150" height="150"></canvas></div>
            </div>
            <div id="save-1" class="save-cell target">
                <div>Mother</div>
                <canvas id="cell-save-1" width="150" height="150"></canvas>
            </div>
            <div id="save-2" class="save-cell">
                <div>Father</div>
                <canvas id="cell-save-2" width="150" height="150"></canvas>
            </div>
        </div>
    </body>
</html>
