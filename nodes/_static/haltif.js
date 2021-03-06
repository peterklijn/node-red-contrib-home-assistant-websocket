const $ = window.jQuery;

const resizeHaltIf = function(input) {
    const $clearHaltIf = $('#clearHaltIf');
    let width =
        input.parent('div').width() -
        $('#node-input-halt_if_compare').width() -
        20.5;

    if ($clearHaltIf.is(':visible')) {
        width = width - $clearHaltIf.outerWidth(true) - 4;
    }

    input.typedInput('width', width);
};

window.resizeHaltIf = resizeHaltIf;

window.setupHaltIf = function(input, compare, nodeName) {
    const $input = $(input);
    const $compare = $(compare);
    const $help = $('#halt_if_help');
    const entityType = { value: 'entity', label: 'entity.' };
    let defaultTypes = [
        'str',
        'num',
        'bool',
        're',
        'msg',
        'flow',
        'global',
        entityType
    ];

    if (nodeName === 'currentState') {
        defaultTypes.splice(4, 1);
    }

    $input.after(
        ' <a id="clearHaltIf" class="editor-button"><i class="fa fa-remove"></i></a>'
    );
    const $clearHaltIf = $('#clearHaltIf');

    $input.typedInput({
        default: 'str',
        types: defaultTypes,
        typeField: '#node-input-halt_if_type'
    });

    $compare.change(function(e) {
        let types = defaultTypes;
        let extraTypes = ['flow', 'global', entityType];
        $help.hide();

        if (defaultTypes.includes('msg')) {
            extraTypes = ['msg'].concat(extraTypes);
        }

        switch (e.target.value) {
            case 'is':
            case 'is_not':
                break;
            case 'lt':
            case 'lte':
            case 'gt':
            case 'gte':
                types = ['num'].concat(extraTypes);
                break;
            case 'includes':
            case 'does_not_include':
                $help.show();
                types = ['str'].concat(extraTypes);
                break;
        }
        $input.typedInput('types', types);
    });

    $compare.trigger('change');

    $input.on('change', function(e) {
        if (e.currentTarget.value) {
            $clearHaltIf.show();
            resizeHaltIf($input);
        }
    });

    $clearHaltIf.on('click', function() {
        $input.typedInput('type', 'str');
        $input.typedInput('value', '');
        $(this).hide();
        resizeHaltIf($input);
    });

    if (!$input.val()) {
        $clearHaltIf.hide();
        resizeHaltIf($input);
    }
    resizeHaltIf($input);
};
