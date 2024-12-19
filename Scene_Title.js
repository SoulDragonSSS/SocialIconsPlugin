/*:
 * @plugindesc Muestra íconos de redes sociales con nombres personalizados y el nombre del creador en la pantalla de título.
 * @author SoulDragonSSS
 *
 * @param ShowFacebook
 * @text Mostrar Facebook
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param FacebookName
 * @text Nombre en Facebook
 * @type text
 * @default Coloca tu facebook
 *
 * @param FacebookURL
 * @text URL de Facebook
 * @type text
 * @default https://facebook.com/
 *
 * @param ShowTwitter
 * @text Mostrar Twitter
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param TwitterName
 * @text Nombre en Twitter
 * @type text
 * @default @mi_twitter
 *
 * @param TwitterURL
 * @text URL de Twitter
 * @type text
 * @default https://twitter.com/
 *
 * @param ShowInstagram
 * @text Mostrar Instagram
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param InstagramName
 * @text Nombre en Instagram
 * @type text
 * @default @mi_instagram
 *
 * @param InstagramURL
 * @text URL de Instagram
 * @type text
 * @default https://instagram.com/
 *
 * @param CreatorName
 * @text Nombre del creador
 * @type text
 * @default Creado por SoulDragonSSS
 *
 * @help
 * Este plugin muestra íconos de redes sociales con nombres personalizados en la pantalla de título.
 * Puedes habilitar o deshabilitar la visualización de cada red social.
 */

(() => {
    const parameters = PluginManager.parameters('Scene_Title');
    const socialData = [
        {
            show: parameters['ShowFacebook'] === 'true',
            name: parameters['FacebookName'],
            url: parameters['FacebookURL'],
            icon: 'facebook'
        },
        {
            show: parameters['ShowTwitter'] === 'true',
            name: parameters['TwitterName'],
            url: parameters['TwitterURL'],
            icon: 'twitter'
        },
        {
            show: parameters['ShowInstagram'] === 'true',
            name: parameters['InstagramName'],
            url: parameters['InstagramURL'],
            icon: 'instagram'
        }
    ];
    const creatorName = parameters['CreatorName'];

    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function () {
        _Scene_Title_create.call(this);
        this.createSocialIcons();
        this.createCreatorName();
    };

    Scene_Title.prototype.createSocialIcons = function () {
        const startX = 15;
        const startY = Graphics.height - 118;
        const spacingY = 40;

        this._socialIcons = new Sprite();
        this.addChild(this._socialIcons);

        socialData
            .filter(data => data.show) // Filtra solo las redes sociales habilitadas
            .forEach((data, index) => {
                const currentY = startY + index * spacingY;

                // Crear botón para el ícono
                const iconButton = this.createButton(
                    ImageManager.loadPicture(data.icon),
                    startX, currentY,
                    () => require('nw.gui').Shell.openExternal(data.url)
                );

                // Crear botón para el texto
                const textButton = this.createButton(
                    this.createTextBitmap(data.name),
                    startX + 30, currentY + 2,
                    () => require('nw.gui').Shell.openExternal(data.url)
                );

                this._socialIcons.addChild(iconButton);
                this._socialIcons.addChild(textButton);
            });
    };

    Scene_Title.prototype.createCreatorName = function () {
        const creatorText = new PIXI.Text(creatorName, {
            fontSize: 16,
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'right',
        });
        creatorText.x = Graphics.width - creatorText.width - 15;
        creatorText.y = Graphics.height - 30;
        this.addChild(creatorText);
    };

    Scene_Title.prototype.createButton = function (bitmap, x, y, onClick) {
        const button = new Sprite_Button();
        button.bitmap = bitmap;
        button.x = x;
        button.y = y;
        button.setClickHandler(onClick);
        return button;
    };

    Scene_Title.prototype.createTextBitmap = function (text) {
        const bitmap = new Bitmap(150, 24);
        bitmap.fontSize = 16;
        bitmap.drawText(text, 0, 0, 150, 24, 'left');
        return bitmap;
    };
})();
