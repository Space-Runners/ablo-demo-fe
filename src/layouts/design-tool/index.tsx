import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { useMe } from '@/api/auth';
import { getTemplates } from '@/api/templates';
import { Design, Template } from '@/lib/types';

import TemplatesPage from '@/views/app/templates';
import DesignsPage from '@/views/app/designs';
import Editor from '@/views/app/editor';
import OrderOrSharePage from '@/views/app/order-or-share';

const getDefaultDesign = (templates) => {
  const [defaultTemplate] = templates;

  const { colors, id, sizes, sides } = defaultTemplate;

  const defaultColor = colors.find((color) => color.name === 'OatMilk') || colors[0];

  return {
    name: '',
    templateColorId: defaultColor.id,
    template: defaultTemplate,
    templateId: id,
    sizeId: sizes[0].id,
    sides: sides.map(({ id }) => ({ templateSideId: id })),
  };
};

export default function DesignTool() {
  const location = useLocation();
  const history = useHistory();

  const [pendingDesign, setPendingDesign] = useState<Design>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: me } = useMe();

  const handleCreateNewDesign = () => {
    setPendingDesign(getDefaultDesign(templates));

    history.push('/app/templates');
  };

  useEffect(() => {
    setLoading(true);

    getTemplates()
      .then((templates) => {
        setTemplates(templates);

        setLoading(false);

        const defaultDesign = getDefaultDesign(templates);

        setPendingDesign(defaultDesign);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box height="100vh" display="flex" flexDirection="column" w={{ base: '100%' }}>
      <Box backgroundColor="#FFFFFF" h="100%" mx="auto" flex={1} w="100%">
        <TransitionGroup>
          <CSSTransition key={location.pathname} classNames="page" timeout={300}>
            <Switch location={location}>
              <Route
                path={`/app/designs`}
                render={() => <DesignsPage onCreateNewDesign={handleCreateNewDesign} user={me} />}
              />
              <Route
                path={`/app/templates`}
                render={() => (
                  <TemplatesPage
                    design={pendingDesign}
                    loading={loading}
                    onDesignChange={setPendingDesign}
                    templates={templates}
                    user={me}
                  />
                )}
              />
              <Route
                path={`/app/editor`}
                render={() => (
                  <Editor
                    pendingDesign={pendingDesign}
                    onPendingDesignChange={setPendingDesign}
                    loadingTemplates={loading}
                    templates={templates}
                    user={me}
                  />
                )}
              />
              <Route path={`/app/order-or-share`} render={() => <OrderOrSharePage />} />
              <Redirect
                from="/"
                to={me && me.roles[0]?.name !== 'guest' ? '/app/designs' : '/app/templates'}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Box>
    </Box>
  );
}
