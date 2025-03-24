module.exports = grammar({
  name: 'rql',

  rules: {
    start: $ => $.combined_expression,

    combined_expression: $ =>
      seq($.single_expression, repeat(seq('&', $.single_expression))),

    single_expression: $ =>
      choice($.expression, $.order_expression),

    expression: $ =>
      choice($.logical_expression, $.comparison, $.any_expression, $.grouped_expression),

    order_expression: $ =>
      seq('order_by', '(', $.order_list, ')'),

    order_list: $ =>
      seq($.order_item, repeat(seq(',', $.order_item))),

    order_item: $ =>
      seq(optional($.SIGN), $.property),

    SIGN: $ => choice('+', '-'),

    logical_expression: $ =>
      seq($.logical_operator, '(', $.argument_list, ')'),

    logical_operator: $ =>
      choice('and', 'or', 'not'),

    comparison_operator: $ =>
      choice('eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'out', 'like', 'ilike'),

    argument_list: $ =>
      seq($.argument, repeat(seq(',', $.argument))),

    argument: $ =>
      choice($.comparison, $.logical_expression, $.any_expression, $.grouped_expression, $.literal, $.property),

    grouped_expression: $ =>
      seq('(', $.expression, ')'),

    any_expression: $ =>
      seq('any', '(', $.property, ',', choice($.comparison, $.logical_expression), ')'),

    comparison: $ =>
      seq($.comparison_operator, '(', $.property, ',', $.value, ')'),

    property: $ =>
      /[a-zA-Z_][\w\-\.]*/,

    value: $ =>
      choice($.literal, $.tuple),

    literal: $ =>
      choice($.BOOLEAN, $.NULL_LITERAL, $.EMPTY_LITERAL, $.DATETIME, $.DATE, $.UUID, $.FLOAT, $.INT, $.UNQUOTED_VAL),

    tuple: $ =>
      seq('(', $.literal, repeat(seq(',', $.literal)), ')'),

    DATETIME: $ =>
      /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})/,

    DATE: $ =>
      /\d{4}-\d{2}-\d{2}/,

    UUID: $ =>
      /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/,

    FLOAT: $ =>
      /-?\d+\.\d+/,

    INT: $ =>
      /-?\d+/,

    BOOLEAN: $ =>
      choice('true', 'false'),

    NULL_LITERAL: $ =>
      'null()',

    EMPTY_LITERAL: $ =>
      'empty()',

    UNQUOTED_VAL: $ =>
      /[^(),]+/,
  },
});
