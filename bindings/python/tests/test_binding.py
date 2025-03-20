from unittest import TestCase

import tree_sitter, tree_sitter_rql


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_rql.language())
        except Exception:
            self.fail("Error loading Python grammar")
