// Taken from https://github.com/stylelint/stylelint-config-recommended
// This file is © 2024 stylelint, license is attached at the bottom

'use strict';

module.exports = {
	rules: {
		'annotation-no-unknown': true,
		'at-rule-no-unknown': true,
		'block-no-empty': true,
		'color-no-invalid-hex': true,
		'comment-no-empty': true,
		'custom-property-no-missing-var-function': true,
		'declaration-block-no-duplicate-custom-properties': true,
		'declaration-block-no-duplicate-properties': [
			true,
			{
				ignore: ['consecutive-duplicates-with-different-syntaxes'],
			},
		],
		'declaration-block-no-shorthand-property-overrides': true,
		'font-family-no-duplicate-names': true,
		'font-family-no-missing-generic-family-keyword': true,
		'function-calc-no-unspaced-operator': true,
		'function-linear-gradient-no-nonstandard-direction': true,
		'function-no-unknown': true,
		'keyframe-block-no-duplicate-selectors': true,
		'keyframe-declaration-no-important': true,
		'media-feature-name-no-unknown': true,
		'media-query-no-invalid': true,
		'named-grid-areas-no-invalid': true,
		'no-descending-specificity': true,
		'no-duplicate-at-import-rules': true,
		'no-duplicate-selectors': true,
		'no-empty-source': true,
		'no-invalid-double-slash-comments': true,
		'no-invalid-position-at-import-rule': true,
		'no-irregular-whitespace': true,
		'property-no-unknown': true,
		'selector-anb-no-unmatchable': true,
		'selector-pseudo-class-no-unknown': true,
		'selector-pseudo-element-no-unknown': true,
		'selector-type-no-unknown': [
			true,
			{
				ignore: ['custom-elements'],
			},
		],
		'string-no-newline': true,
		'unit-no-unknown': true,
	},
};

// MIT License
//
// Copyright (c) 2018 - present stylelint
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
