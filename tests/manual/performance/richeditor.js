/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals console, window, document */

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ArticlePluginSet from '@ckeditor/ckeditor5-core/tests/_utils/articlepluginset';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import AutoFormat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import AutoSave from '@ckeditor/ckeditor5-autosave/src/autosave';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import StandardEditingMode from '@ckeditor/ckeditor5-restricted-editing/src/standardeditingmode';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';

ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [
			ArticlePluginSet,
			Alignment,
			AutoFormat,
			AutoSave,
			Strikethrough,
			Subscript,
			Superscript,
			Underline,
			CodeBlock,
			FontBackgroundColor,
			FontColor,
			FontFamily,
			FontSize,
			Highlight,
			HorizontalLine,
			TodoList,
			Mention,
			PageBreak,
			PasteFromOffice,
			RemoveFormat,
			StandardEditingMode,
			SpecialCharacters,
			WordCount
		],
		toolbar: {
			items: [
				'heading',
				'|',
				'alignment',
				'bold',
				'italic',
				'link',
				'bulletedList',
				'numberedList',
				'todoList',
				'|',
				'outdent',
				'indent',
				'|',
				'blockQuote',
				'insertTable',
				'mediaEmbed',
				'undo',
				'redo',
				'strikethrough',
				'subscript',
				'superscript',
				'underline',
				'codeBlock',
				'fontBackgroundColor',
				'fontColor',
				'fontFamily',
				'fontSize',
				'highlight',
				'horizontalLine',
				'pageBreak',
				'removeFormat',
				'restrictedEditingException',
				'specialCharacters'
			],
			shouldNotGroupWhenFull: true
		},
		table: {
			contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
		}
	} )
	.then( editor => {
		window.editor = editor;

		addWordCountListener( editor );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

function addWordCountListener( editor ) {
	const wordCount = editor.plugins.get( WordCount );
	const wordCountElement = document.getElementById( 'word-count' );
	const characterCountElement = document.getElementById( 'character-count' );

	wordCountElement.innerHTML = wordCount.words;
	characterCountElement.innerHTML = wordCount.characters;

	wordCount.on( 'change:words', ( evt, name, value ) => {
		document.getElementById( 'word-count' ).innerHTML = value;
	} );

	wordCount.on( 'change:characters', ( evt, name, value ) => {
		document.getElementById( 'character-count' ).innerHTML = value;
	} );

	document.getElementById( 'word-count-wrapper' ).style.display = 'block';
}
